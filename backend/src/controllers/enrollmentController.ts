import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const enrollInCourse = async (req: Request, res: Response) => {
    const { userId, courseId } = req.body;

    try {
        const existingEnrollment = await prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });

        if (existingEnrollment) {
        res.status(400).json({ message: "User is already enrolled in this course" });
        return
        }

        const enrollment = await prisma.enrollment.create({
            data: {
                userId,
                courseId,
            },
        });

        res.status(201).json({ message: "Enrollment successful", enrollment });
    } catch (error) {
        res.status(500).json({ message: "Error enrolling in course", error });
    }
};

//get the courses a student is enrolled in
export const getUserEnrollments = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const enrollments = await prisma.enrollment.findMany({
            where: { userId: Number(userId) },
            include: { course: true },
        });

        res.json({ enrollments });
    } catch (error) {
        res.status(500).json({ message: "Error fetching enrollments", error });
    }
};


//retrieve all students enrolled in  a specific course
export const getCourseEnrollments = async (req: Request, res: Response) => {
    const { courseId } = req.params;

    try {
        const enrollments = await prisma.enrollment.findMany({
            where: { courseId: Number(courseId) },
            include: { user: true }, 
        });

        res.json({ enrollments });
    } catch (error) {
        res.status(500).json({ message: "Error fetching enrollments", error });
    }
};

//delete student from a course
export const unenrollFromCourse = async (req: Request, res: Response) => {
    const { userId, courseId } = req.body;

    try {
        await prisma.enrollment.delete({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });

        res.json({ message: "User unenrolled from course successfully" });
    } catch (error: any) {
        if (error.code === "P2025") {
            res.status(404).json({ message: "Enrollment not found" });
        } else {
            res.status(500).json({ message: "Error unenrolling from course", error });
        }
    }
};

