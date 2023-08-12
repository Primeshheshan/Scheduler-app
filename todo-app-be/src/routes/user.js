import express from 'express';
import {
  getProfile,
  updateProfile,
  sendOTP,
  verifyOTP,
} from '../controllers/user.js';

const router = express.Router();

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

export default router;
