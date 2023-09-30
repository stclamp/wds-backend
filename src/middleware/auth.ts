import { Request, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { EAuthMessages, ITokenPayload } from '../types';

const secretKey: string = process.env.SECRET_KEY || '';
export const generateToken = (payload: ITokenPayload): string => {
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
};

export const verifyToken =
  (requiredRole: string): RequestHandler =>
  (req: Request & ITokenPayload, res, next) => {
    const token: string | undefined = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: EAuthMessages.NO_TOKEN });
    }

    jwt.verify(token, secretKey, (err, decoded: ITokenPayload) => {
      if (err) {
        return res.status(401).json({ message: EAuthMessages.INVALID_TOKEN });
      }

      req.userId = decoded.userId;

      if (decoded.role !== requiredRole) {
        return res.status(403).json({
          message: EAuthMessages.NO_PERMISSION,
        });
      }

      next();
    });
  };
