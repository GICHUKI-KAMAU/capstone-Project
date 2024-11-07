import { Router } from "express";
import { createAssignment, deleteAssignment, getAssignmentsByCourse, updateAssignment } from "../controllers/assignmentController";

const router = Router();

router.post("/assignments", createAssignment);
router.get("/courses/:courseId/assignments", getAssignmentsByCourse);
router.patch("/assignments/:id", updateAssignment);
router.delete("/assignments/:id", deleteAssignment);

export default router;
 