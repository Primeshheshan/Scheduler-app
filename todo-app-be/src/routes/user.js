import express from 'express';
import { getProfile, updateProfile } from '../controllers/user.js';

const router = express.Router();

router.get('/profile', getProfile);
router.put('/profile', updateProfile);

export default router;
