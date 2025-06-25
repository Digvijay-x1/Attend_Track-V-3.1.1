import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getDashboardData } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get('/get-dashboard-data', protectRoute , getDashboardData)

export default router;