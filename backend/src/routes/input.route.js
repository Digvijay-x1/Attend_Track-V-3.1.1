import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { todaySchedule , recentAttendance } from "../controllers/input.controller.js";

const router = express.Router();

router.get("/today-schedule" , protectRoute,  todaySchedule);
router.get("/recent-attendance" , protectRoute,  recentAttendance);

export default router;
