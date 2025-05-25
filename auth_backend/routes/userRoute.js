import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../model/userSchema.js';
import { registerUser, getUserProfile } from '../controller/userController.js';

const router = express.Router();

// ✅ Register route
router.post('/register', registerUser);

// ✅ Login route (inline version)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      user: {
        email: user.email,
        username: user.username,
        id: user._id,
        token, // ✅ Include token inside user object
      }
    });
  } catch (error) {
    console.error('User login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Get regular users (for admin dashboard)
router.get('/regular-users', async (req, res) => {
  try {
    const users = await User.find({}, 'email username');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// (Optional) Protected route example
// router.get('/profile', userMiddleware, getUserProfile);

export default router;
