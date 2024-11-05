import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) 
     {
      res.status(401).json({ message: 'Access Denied' });
  return}
    

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
       res.status(403).json({ message: 'Invalid Token' });
       return}
       req.user = user as JwtPayload & { role?: string }; 
       next();
  });
};
