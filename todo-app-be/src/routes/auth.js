import express from 'express';
import {
  loginUser,
  registerUser,
  getAccessToken,
  logoutUser,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/refresh', getAccessToken);
router.post('/register', registerUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
