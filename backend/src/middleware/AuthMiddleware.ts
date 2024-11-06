import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const activeUser = async (
    req: Request,
    res: Response
): Promise<{ id: number; name: string|null; email: string; role: string } | null> => {
    const token = req.cookies.token;
    if (!token) {
        console.log("No token found in cookies");
        return null;
    }
    const secretToken = process.env.JWT_SECRET;
    if (!secretToken) {
        console.log("SECRET_TOKEN environment variable is missing");
        return null;
    }

    try {
        const verifiedUser = jwt.verify(token, secretToken) as jwt.JwtPayload;
        console.log("Verified user from token:", verifiedUser);

        const userId = verifiedUser.id;
        
        const user = await prisma.user.findUnique({
            where: { id:userId },
        });
        
        if (!user) {
            console.log("No user found with the provided userId:", userId);
            return null;
        }

        console.log("User found:", user);
        return user;
    } catch (error) {
        console.error("Error verifying token:", error);
        return null;
    }
};

export { activeUser };