import { Router } from 'express';
import { verifyToken } from '../middleware/auth';
import {
  getMe,
  getUsers,
  loginUser,
  logout,
  registerUser,
} from '../controller/user.controller';
import { ERoles } from '../types';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/users', verifyToken(ERoles.ADMIN), getUsers);
router.get('/me', verifyToken(ERoles.ADMIN), getMe);

router.post('/logout', logout);

export default router;
