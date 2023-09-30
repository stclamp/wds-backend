import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { User } from '../models/user.model';
import { generateToken } from '../middleware/auth';
import { EUserMessages } from '../types';
import '../middleware/passport';

export const registerUser: RequestHandler = async (req, res) => {
  const { username, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user: User = await User.create({
      username,
      password: hashedPassword,
      role,
    });
    res
      .status(201)
      .json({ message: 'User registered successfully', data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'An error occurred!', data: error.message });
  }
};

export const loginUser: RequestHandler = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({
        message: EUserMessages.ERROR,
        data: err.message,
      });
    }

    if (!user) {
      return res.status(401).json({
        message: EUserMessages.INVALID_CREDENTIALS,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.status(500).json({
          message: EUserMessages.ERROR,
          data: err.message,
        });
      }

      const { id, username, role } = user;
      const payload = { userId: id, username, role };
      const token = generateToken(payload);
      res.cookie('token', token, { httpOnly: true });
      return res.status(200).json({ message: EUserMessages.LOGGED_IN });
    });
  })(req, res, next);
};

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const allUsers: User[] = await User.findAll();
    res.status(200).json({ message: EUserMessages.FETCHED, data: allUsers });
  } catch (error) {
    res.status(500).json({ message: EUserMessages.ERROR, data: error.message });
  }
};

export const logout: RequestHandler = async (req, res) => {
  res.clearCookie('token');

  res.status(200).json({ message: EUserMessages.LOGOUT });
};
