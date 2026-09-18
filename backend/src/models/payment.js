import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'created',
    },
    membershipType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const PaymentModel = mongoose.model('Payment', paymentSchema);
