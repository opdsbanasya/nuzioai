import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { connectDb } from "./config/connection.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

import User from "./models/user.js";

import userRouter from "./routes/user.route.js";
import paymentRouter from "./routes/payment.route.js";
import newsRouter from "./routes/news.route.js";

// Firebase Auth Sync Route
app.post("/api/auth/firebase-login", async (req, res) => {
  try {
    const { email, name, image } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    let user = await User.findOne({ email }).lean();
    if (!user) {
      const newUser = await User.create({ email, name, image });
      user = newUser.toObject();
    }

    // Fetch user preferences
    const UserPreference = (await import('./models/userPreference.js')).default;
    const prefs = await UserPreference.findOne({ userId: user._id }).lean();

    if (prefs) {
      delete prefs._id;
    }

    const mergedUser = { ...user, ...(prefs || {}) };

    res.status(200).json(mergedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Temporary cleanup route — delete after use
app.post("/api/cleanup-prefs", async (req, res) => {
  try {
    const UserPreference = (await import('./models/userPreference.js')).default;
    // Get all real user IDs
    const allUsers = await User.find({}, '_id').lean();
    const realUserIds = allUsers.map(u => u._id);

    // Delete prefs where userId is NOT a real user
    const deleted = await UserPreference.deleteMany({ userId: { $nin: realUserIds } });

    // List remaining
    const remaining = await UserPreference.find({}).lean();

    res.json({
      message: `Deleted ${deleted.deletedCount} duplicate(s)`,
      remaining: remaining.map(p => ({ _id: p._id, userId: p.userId, voice: p.voice }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User routes (Preferences, etc)
app.use("/api/users", userRouter);

// Payment routes (Razorpay)
app.use("/api/payment", paymentRouter);

// News routes
app.use("/api/news", newsRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

connectDb()
  .then(() => {
    console.log("Connection established!");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
