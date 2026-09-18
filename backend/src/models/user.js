import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 150,
      lowercase: true,
    },
    image: {
      type: String,
    },
    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
    subscriptionStatus: {
      type: String,
      default: "free",
      enum: ["free", "pro", "annual"],
    },
    razorpayCustomerId: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
