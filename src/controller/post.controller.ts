import { RequestHandler } from 'express';
import { Post } from '../models/post.model';
import { EPostMessages } from '../types';
import connection from '../db/config';

export const createPost: RequestHandler = async (req, res) => {
  try {
    const posts = await Post.create({ ...req.body });

    return res
      .status(200)
      .json({ message: EPostMessages.CREATED, data: posts });
  } catch (error) {
    return res
      .status(500)
      .json({ message: EPostMessages.ERROR, data: error.message });
  }
};

export const deletePost: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost: Post | null = await Post.findByPk(id);

    await Post.destroy({ where: { id } });

    return res
      .status(200)
      .json({ message: EPostMessages.DELETED, data: deletedPost });
  } catch (error) {
    return res
      .status(500)
      .json({ message: EPostMessages.ERROR, data: error.message });
  }
};

export const getAllPosts: RequestHandler = async (req, res) => {
  try {
    const allPosts: Post[] = await Post.findAll();

    return res
      .status(200)
      .json({ message: EPostMessages.FETCHED, data: allPosts });
  } catch (error) {
    return res
      .status(500)
      .json({ message: EPostMessages.ERROR, data: error.message });
  }
};

export const getPostById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const post: Post = await Post.findByPk(id);

    return res
      .status(200)
      .json({ message: EPostMessages.FETCHED_SINGLE, data: post });
  } catch (error) {
    return res
      .status(500)
      .json({ message: EPostMessages.ERROR, data: error.message });
  }
};

export const updatePost: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await Post.update({ ...req.body }, { where: { id } });

    const updatedPost: Post = await Post.findByPk(id);

    return res
      .status(200)
      .json({ message: EPostMessages.UPDATED, data: updatedPost });
  } catch (error) {
    return res
      .status(500)
      .json({ message: EPostMessages.ERROR, data: error.message });
  }
};

export const getRandomPost: RequestHandler = async (req, res) => {
  try {
    const randomPost: Post = await Post.findOne({ order: connection.random() });

    return res
      .status(200)
      .json({ message: EPostMessages.RANDOM, data: randomPost });
  } catch (error) {
    return res
      .status(500)
      .json({ message: EPostMessages.ERROR, data: error.message });
  }
};

export const getLastPosts: RequestHandler = async (req, res) => {
  try {
    const lastPosts: Post[] = await Post.findAll({
      limit: 3,
      order: [['createdAt', 'DESC']],
    });

    return res
      .status(200)
      .json({ message: EPostMessages.FETCHED, data: lastPosts });
  } catch (error) {
    return res
      .status(500)
      .json({ message: EPostMessages.ERROR, data: error.message });
  }
};
