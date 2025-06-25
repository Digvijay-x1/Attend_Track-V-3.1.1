import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import courseRoute from "./routes/course.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json({limit: "10mb"}));
app.use(cookieParser());

app.use('/api/auth' , authRoute)
app.use('/api/courses' , courseRoute)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
});





