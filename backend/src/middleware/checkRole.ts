import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { activeUser } from './AuthMiddleware';

const isAdmin=async(req:Request,res:Response,next:NextFunction)=>{
  const user=await  activeUser(req,res)
  if(!user){
    res.status(404).json({message:'User not found'})
    return
  }
  console.log(user.role);
  if(user.role!=='admin'){
    res.status(404).json({message:'UnAuthorized Access: Audmin/instructor Role only'})
    return
  }

  next()
}

const isAInsructor=async(req:Request,res:Response,next:NextFunction)=>{
  const user=await  activeUser(req,res)
  if(!user){
    res.status(404).json({message:'User not found'})
    return
  }
  console.log(user.role);
  if(user.role!=='admin'){
    res.status(404).json({message:'UnAuthorized Access: Audmin/Instructor Role only'})
    return
  }

  next()
}

export {isAdmin,isAInsructor}