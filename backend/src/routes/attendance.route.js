import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { markAttendance , getAttendance } from "../controllers/attendance.controller.js";

const router = express.Router();

router.post('/mark-attendance/:courseId', protectRoute , markAttendance)
router.get('/get-attendance/:courseId', protectRoute , getAttendance)




export default router;