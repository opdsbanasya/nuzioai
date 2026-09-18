import express from "express";
import User from "../models/user.js";

const authRouter = express.Router();

authRouter.post("/firebase-login", async (req, res) => {
    try {
        const { email, name, image } = req.body;
        if (!email) return res.status(400).json({ error: "Email is required" });

        let user = await User.findOne({ email }).lean();
        if (!user) {
            const newUser = await User.create({ email, name, image });
            user = newUser.toObject();
        }

        // Fetch user preferences
        const UserPreference = (await import('../models/userPreference.js')).default;
        const prefs = await UserPreference.findOne({ userId: user._id }).lean();

        if (prefs) {
            delete prefs._id;
        }

        const mergedUser = { ...user, ...(prefs || {}) };
        mergedUser.subscriptionStatus = mergedUser.subscriptionStatus || "free";

        res.status(200).json(mergedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default authRouter;