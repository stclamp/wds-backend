import { Post } from '../models/post.model';

export enum EPostMessages {
  ERROR = 'An error occurred!',
  CREATED = 'Post created successful',
  DELETED = 'Post deleted successful',
  FETCHED = 'Posts fetched successful',
  FETCHED_SINGLE = 'Post fetched successful',
  UPDATED = 'Post updated successful',
  RANDOM = 'Random post fetched successful',
}

export enum EUserMessages {
  ERROR = 'An error occurred!',
  INVALID_CREDENTIALS = 'Invalid login credentials',
  LOGGED_IN = 'Logged in successful',
  FETCHED = 'Users fetched successful',
  LOGOUT = 'Logged out successful',
}

export enum EAuthMessages {
  NO_TOKEN = 'No token provided',
  INVALID_TOKEN = 'Invalid token',
  NO_PERMISSION = 'You do not have the authorization and permissions to access this resource.',
}

export interface ITokenPayload {
  userId: string;
  role: string;
}

export interface IAllPosts {
  rows: Post[];
  count: number;
}

export enum ERoles {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
}
