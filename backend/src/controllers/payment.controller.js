import Razorpay from 'razorpay';
import crypto from 'crypto';
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils.js';
import User from '../models/user.js';
import { PaymentModel } from '../models/payment.js';

if (process.env.NODE_ENV === 'production' && (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET)) {
  throw new Error("FATAL ERROR: RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be provided in production.");
}

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy_key_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret_key',
});

export const createOrder = async (req, res) => {
  try {
    const { amount, plan, userId } = req.body;
    
    if (!amount || !plan || !userId) {
      return res.status(400).json({ error: "amount, plan, and userId are required" });
    }

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    
    if (!order) {
      return res.status(500).json({ error: "Some error occurred while creating order" });
    }

    // Save payment intent to database
    await PaymentModel.create({
      userId,
      orderId: order.id,
      membershipType: plan,
      status: 'created'
    });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      userId,
      plan 
    } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET || 'dummy_secret_key';

    // Verify signature
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest("hex");

    if (digest !== razorpay_signature) {
      return res.status(400).json({ error: "Transaction not legit!" });
    }

    // Payment is valid, update user's subscription
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { subscriptionStatus: plan },
      { new: true }
    );

    res.status(200).json({ 
      message: "Payment successful", 
      subscriptionStatus: updatedUser.subscriptionStatus 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const webhook = async (req, res) => {
  try {
    const webhookSignature = req.header("X-Razorpay-Signature");
    
    // Fallback secret for demo/local testing
    const secret = process.env.RAZORPAY_KEY_SECRET || 'dummy_secret_key';
    
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      secret
    );

    if (!isWebhookValid) {
      throw new Error("Invalid signature");
    }

    const paymentDetails = req.body.payload.payment.entity;

    // Update payment status
    const payment = await PaymentModel.findOne({
      orderId: paymentDetails.order_id,
    });
    
    if (payment) {
      payment.status = paymentDetails.status;
      await payment.save();

      // update the user as premium if payment is successful/captured
      if (paymentDetails.status === 'captured') {
        const user = await User.findById(payment.userId);
        if (user) {
          user.subscriptionStatus = payment.membershipType;
          await user.save();
        }
      }
    }

    // return success response to razorpay with 200 status
    return res.status(200).json({ message: "Webhook received" });
  } catch (err) {
    res.status(400).json({ message: "ERROR: " + err.message });
  }
};
