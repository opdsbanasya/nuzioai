import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { connectDb } from "./config/connection.js";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

import User from "./models/user.js";

import userRouter from "./routes/user.route.js";
import paymentRouter from "./routes/payment.route.js";
import newsRouter from "./routes/news.route.js";
import authRouter from "./routes/auth.route.js";

// Firebase Auth Sync Route
app.use("/api/auth", authRouter);

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
