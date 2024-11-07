import { Router } from "express";
import { enrollInCourse, getUserEnrollments, getCourseEnrollments, unenrollFromCourse } from "../controllers/enrollmentController";

const router = Router();

router.post("/enroll", enrollInCourse);
router.get("/user/:userId/enrollments", getUserEnrollments);
router.get("/course/:courseId/enrollments", getCourseEnrollments);
router.delete("/unenroll", unenrollFromCourse);

export default router;
