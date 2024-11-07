import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import {
  userLoginValidator,
  userRegistrationValidator,
} from "../middleware/validators";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    const validationError = userRegistrationValidator(name, email, password);
    if (validationError) {
      res.status(400).json({ message: validationError });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: req.body.role || "student",
      },
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const validationError = userLoginValidator(email, password);
    if (validationError) {
      res.status(400).json({ message: validationError });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Set the token as an HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 30), // Expires in 30 minutes
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    // Send the JSON response with the token
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
    console.log(error);
  }
};
// Get All Users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
    return;
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error });
    return;
  }
};
// Controller to get a user by ID
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// update a user's details
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    
    if (data.password) {
      
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data,
    });

    res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(500).json({ message: "Error updating user", error });
    }
  }
};
//Delete user bu ID
export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });

    res.json({
      message: "User deleted successfully",
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(500).json({ message: "Error deleting user", error });
    }
  }
};
