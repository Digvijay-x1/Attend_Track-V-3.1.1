import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { calculatorController } from "../controllers/calculator.controller.js";

const router = express.Router();

router.post("/get-calculation" ,protectRoute , calculatorController);


export default router;