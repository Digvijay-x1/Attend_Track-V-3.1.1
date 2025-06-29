import express from "express";
import { login, signup, logout, updateProfile, checkAuth, googleLogin } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post('/signup', signup)

router.post('/login', login)

router.post('/logout', logout)

router.post('/google-login', googleLogin)

router.put('/update-profile', protectRoute, updateProfile)

router.get('/check-auth', protectRoute, checkAuth)


export default router;