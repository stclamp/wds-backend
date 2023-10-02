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
    const token: string | undefined = req.cookies.token; //get token from cookies

    if (!token) {
      return res.status(401).json({ message: EAuthMessages.NO_TOKEN }); //if user not authenticated
    }

    //check token
    jwt.verify(token, secretKey, (err, decoded: ITokenPayload) => {
      if (err) {
        return res.status(401).json({ message: EAuthMessages.INVALID_TOKEN }); // if token incorrect
      }

      req.userId = decoded.userId; //set user id to request

      if (decoded.role !== requiredRole) {
        return res.status(403).json({
          message: EAuthMessages.NO_PERMISSION, // if incorrect role
        });
      }

      next();
    });
  };
