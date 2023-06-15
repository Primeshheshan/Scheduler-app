import express from 'express';
import {
  loginUser,
  registerUser,
  getAccessToken,
  logoutUser,
} from '../controllers/auth.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/refresh', getAccessToken);
router.post('/register', registerUser);

export default router;
