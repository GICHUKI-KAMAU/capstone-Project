import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from "../controllers/courseController";
import router from "./authRoutes";

router.post('/createCourse', createCourse);
router.get('/getAllCourses', getAllCourses);
router.get('/getCourseById/:id', getCourseById);
router.patch('/updateCourse/:id', updateCourse);
router.delete('/deleteCourse/:id', deleteCourse);
export {router as courseRoutes}