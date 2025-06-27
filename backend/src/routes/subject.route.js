import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getSubjectsData } from "../controllers/subject.controller.js";

const router = express.Router();

router.get('/get-subjects' , protectRoute , getSubjectsData)

export default router;