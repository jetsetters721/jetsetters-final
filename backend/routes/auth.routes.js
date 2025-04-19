import express from 'express';
import { register, login, getMe } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth server is running' });
});

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

export default router;
