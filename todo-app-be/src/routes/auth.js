import express from 'express';
import {
  forgotPassword,
  getAccessToken,
  loginUser,
  logoutUser,
  registerUser,
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
