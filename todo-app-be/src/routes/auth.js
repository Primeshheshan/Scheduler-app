import express from 'express';
import {
  loginUser,
  registerUser,
  getAccessToken,
  logoutUser,
  sendMailToUser,
} from '../controllers/auth.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/refresh', getAccessToken);
router.post('/register', registerUser);
router.post('/sendmail', sendMailToUser);

export default router;
