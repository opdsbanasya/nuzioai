import UserPreference from "../models/userPreference.js";
import User from "../models/user.js";

export const savePreferences = async (req, res) => {
  try {
    const { userId, language, profession, interests, voice, briefLength, deliveryTime } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // Allowed preference fields
    const allowedFields = [
      'language', 'profession', 'interests', 'voice', 'briefLength', 
      'deliveryTime', 'darkMode', 'offlineMode', 'autoAdvance', 
      'pushNotifications', 'playbackSpeed'
    ];
    
    const updateData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Upsert user preferences
    const preferences = await UserPreference.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, upsert: true }
    );

    // Mark onboarding as completed in User model
    await User.findByIdAndUpdate(userId, { onboardingCompleted: true });

    res.status(200).json({ message: "Preferences saved successfully", preferences });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
