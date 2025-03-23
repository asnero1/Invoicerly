import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import UserModel from '../models/userModel';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const JWT_SECRET = process.env.JWT_SECRET as Secret;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

console.log('JWT_SECRET loaded:', process.env.JWT_SECRET);

interface AuthRequest extends Request {
  user?: { id: string };
}

// ✅ Signup User (Returns JWT Token)
export const signupUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, email, password: hashedPassword, active: true });

    await newUser.save();

    // Generate JWT token correctly
    // ✅ Generate JWT token correctly
    const token = jwt.sign(
      { id: newUser._id.toString() },
      JWT_SECRET as Secret,
      { expiresIn: JWT_EXPIRES_IN } as SignOptions,
    );

    res.status(201).json({ message: 'User signed up successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Login User (Returns JWT Token)
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT token correctly
    const token = jwt.sign(
      { id: user._id.toString() },
      JWT_SECRET as Secret,
      { expiresIn: JWT_EXPIRES_IN } as SignOptions,
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Delete User (Soft Delete)
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.active = false;
    await user.save();

    res.status(200).json({ message: 'User deleted (soft delete)' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Reactivate User
export const reactivateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.active = true;
    await user.save();

    res.status(200).json({ message: 'User reactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Protected Route: Get User Profile
export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized: No user data found.' });
    }

    const user = await UserModel.findById(req.user.id).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Profile fetched successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
