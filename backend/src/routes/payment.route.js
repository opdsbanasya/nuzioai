import express from 'express';
import { createOrder, verifyPayment, webhook } from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);
router.post('/webhook', webhook);

export default router;
