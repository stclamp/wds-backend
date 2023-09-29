import { RequestHandler } from 'express';
import { Post } from '../models/post.model';

export const createPost: RequestHandler = async (req, res) => {
  const posts = await Post.create({ ...req.body });

  return res
    .status(200)
    .json({ message: 'Post created successful', data: posts });
};

export const deletePost: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const deletedPost: Post | null = await Post.findByPk(id);

  await Post.destroy({ where: { id } });

  return res
    .status(200)
    .json({ message: 'Post deleted successful', data: deletedPost });
};

export const getAllPosts: RequestHandler = async (req, res) => {
  const allPosts: Post[] = await Post.findAll();

  return res
    .status(200)
    .json({ message: 'Posts fetched successfull', data: allPosts });
};

export const getPostById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const post: Post = await Post.findByPk(id);

  return res
    .status(200)
    .json({ message: 'Post fetched successful', data: post });
};

export const updatePost: RequestHandler = async (req, res) => {
  const { id } = req.params;

  await Post.update({ ...req.body }, { where: { id } });

  const updatedPost: Post = await Post.findByPk(id);

  return res
    .status(200)
    .json({ message: 'Post updated successful', data: updatedPost });
};
