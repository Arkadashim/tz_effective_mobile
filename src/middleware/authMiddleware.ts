import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError';
import { config } from '../config';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new AppError('No token provided', 401);
  }

  try {
    const decoded = jwt.verify(token, config.app.jwtSecret);
    (req as any).user = decoded;
    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}