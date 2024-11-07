import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new assignment
export const createAssignment = async (req: Request, res: Response) => {
    const { title, description, dueDate, courseId } = req.body;

    try {
        const course = await prisma.course.findUnique({ where: { id: courseId } });
        if (!course) {
            res.status(404).json({ message: "Course not found" });
            return 
        }

        const assignment = await prisma.assignment.create({
            data: {
                title,
                description,
                dueDate,
                courseId,
            },
        });

        res.status(201).json({ message: "Assignment created successfully", assignment });
    } catch (error) {
        res.status(500).json({ message: "Error creating assignment", error });
    }
};

// Get all assignments
export const getAssignmentsByCourse = async (req: Request, res: Response) => {
    const { courseId } = req.params;

    try {
        const assignments = await prisma.assignment.findMany({
            where: { courseId: Number(courseId) },
        });

        res.json({ assignments });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving assignments", error });
    }
};

// Update an assignment by ID
export const updateAssignment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;

    try {
        const assignment = await prisma.assignment.update({
            where: { id: Number(id) },
            data: {
                title,
                description,
                dueDate,
            },
        });

        res.json({ message: "Assignment updated successfully", assignment });
    } catch (error: any) {
        if (error.code === "P2025") {
            res.status(404).json({ message: "Assignment not found" });
        } else {
            res.status(500).json({ message: "Error updating assignment", error });
        }
    }
};

export const deleteAssignment = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {

    const deletedAssignment = await prisma.assignment.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      message: "Assignment deleted successfully",
      assignment: deletedAssignment,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Assignment not found" });
    } else {
      res.status(500).json({ message: "Error deleting assignment", error });
    }
  }
};

