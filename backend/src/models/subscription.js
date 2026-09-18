import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    planType: {
      type: String,
      enum: ['free', 'pro', 'annual'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    razorpayOrderId: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
    },
    razorpaySignature: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'failed'],
      default: 'pending',
    },
    startsAt: {
      type: Date,
    },
    expiresAt: {
      type: Date,
    }
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
