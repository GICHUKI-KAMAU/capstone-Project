import { Request, response, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { request } from "http";
import { string } from "joi";
import { activeUser } from "../middleware/AuthMiddleware";
import { parse } from "path";

const prisma = new PrismaClient();

export const createCourse = async(req: Request, res: Response)=>{
    const {title, description} = req.body;
    try{
        const user = await activeUser(req, res)
        if(!user){
            res.status(404).json({message: 'User not found please login'})
            return
        }    
        const existingCourse = await prisma.course.findUnique({
            where: { title }
        }); 

        if (existingCourse) {
            res.status(409).json({ message: 'Course with this title already exists' });
            return;
        }
                                                                                                              
        const course = await prisma.course.create({
            data: {
                title,
                description,
                instructorId: user.id,
                published: false,
            },
        });
        res.status(201).json({message: 'Course created successfully', course: course})
    }catch(error){
        res.status(500).json({message: 'Error creating course', error})
    }
};

//get all courses
export const getAllCourses = async (req: Request, res: Response) => {
    try {
      const course = await prisma.course.findMany();
      
      res.status(200).json(course);
      return;
    } catch (error) {
      console.error("Error fetching Courses:", error);
      res.status(500).json({ message: "Error fetching Courses", error });
      return;
    }
  };

  //get course by id
  export const getCourseById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    try {
      const course = await prisma.course.findUnique({
        where: { id: Number(id) },
      });
  
      if (!course) {
        res.status(404).json({ message: "Course not found" });
        return;
      }
  
      res.status(200).json(course);
    } catch (error) {
      console.error("Error fetching Course:", error);
      res.status(500).json({ message: "Error fetching Course", error });
    }
  };

  // update a course details
  export const updateCourse = async (req: Request, res: Response) => {
    const { id } = req.params; 
    const data = req.body;       

    try {
        
        const updatedCourse = await prisma.course.update({
            where: { id: Number(id) },
            data,
        });

        res.json({
            message: "Course updated successfully",
            course: updatedCourse, 
        });
    } catch (error: any) {
        
        if (error.code === "P2025") {
            res.status(404).json({ message: "Course not found" });
        } else {
            res.status(500).json({ message: "Error updating course", error });
        }
    }
};

//delete course by id
export const deleteCourse = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      await prisma.course.delete({
        where: { id: Number(id) },
      });
  
      res.json({
        message: "Course deleted successfully",
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        res.status(404).json({ message: "Course not found" });
      } else {
        res.status(500).json({ message: "Error deleting Course", error });
      }
    }
  };