import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { createCourse , getCourses , updateCourse , deleteCourse } from "../controllers/course.controller.js";

const router = express.Router();


router.post('/create-course', protectRoute , createCourse)
router.get('/get-courses', protectRoute , getCourses)
router.put('/update-course/:id', protectRoute , updateCourse)
router.delete('/delete-course/:id', protectRoute , deleteCourse)

export default router;