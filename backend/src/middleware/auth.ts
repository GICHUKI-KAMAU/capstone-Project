import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token =req.cookies.token
  if (!token) 
     {
      res.status(401).json({ message: 'Access Denied' });
  return
   }
   const secretToken = process.env.JWT_SECRET;
   if(!secretToken){
    res.status(401).json({ message: 'SECRET TOKEN Not foud' });
  return
   }

  const user=jwt.verify(token,secretToken )
  console.log(user);
  if(!user){
    res.status(401).json({ message: 'User not found' });
    return
  }
next()
};
