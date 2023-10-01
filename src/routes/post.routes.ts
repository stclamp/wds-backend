import { Router } from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getRandomPost,
  getLastPosts,
} from '../controller/post.controller';
import { verifyToken } from '../middleware/auth';
import { ERoles } from '../types';

const router = Router();

router.post('/', verifyToken(ERoles.ADMIN), createPost);

router.get('/', getAllPosts);

router.get('/last', getLastPosts);

router.get('/random', getRandomPost);

router.get('/:id', getPostById);

router.put('/:id', verifyToken(ERoles.ADMIN), updatePost);

router.delete('/:id', verifyToken(ERoles.ADMIN), deletePost);

export default router;
