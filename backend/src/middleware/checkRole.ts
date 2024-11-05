import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload & { role?: string }; 

    if (!user || !user.role || !roles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource.' });
    }

    next();
  };
};
