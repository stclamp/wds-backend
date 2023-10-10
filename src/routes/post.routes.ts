import { Router } from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getRandomPost,
  getLastPosts,
  getAllPostsAndPaginate,
} from '../controller/post.controller';
import { verifyToken } from '../middleware/auth';
import { ERoles } from '../types';
import { uploadFile } from '../middleware/image';

const router = Router();

router.post(
  '/',
  verifyToken(ERoles.ADMIN),
  uploadFile.single('image'),
  createPost
);

router.get('/', getAllPostsAndPaginate);

router.get('/all', getAllPosts);

router.get('/last', getLastPosts);

router.get('/random', getRandomPost);

router.get('/:id', getPostById);

router.put(
  '/:id',
  verifyToken(ERoles.ADMIN),
  uploadFile.single('image'),
  updatePost
);

router.delete('/:id', verifyToken(ERoles.ADMIN), deletePost);

export default router;
