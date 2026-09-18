import mongoose from "mongoose";

const userPreferenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    language: {
      type: String,
      default: 'en',
    },
    profession: {
      type: String,
    },
    interests: {
      type: [String],
      default: [],
    },
    voice: {
      type: String,
    },
    briefLength: {
      type: Number,
      default: 5,
    },
    deliveryTime: {
      type: String,
      default: '07:00 AM',
    },
    darkMode: {
      type: Boolean,
      default: true,
    },
    offlineMode: {
      type: Boolean,
      default: false,
    },
    autoAdvance: {
      type: Boolean,
      default: true,
    },
    pushNotifications: {
      type: Boolean,
      default: false,
    },
    playbackSpeed: {
      type: Number,
      default: 1,
    }
  },
  {
    timestamps: true,
  }
);

const UserPreference = mongoose.model("UserPreference", userPreferenceSchema);

export default UserPreference;
