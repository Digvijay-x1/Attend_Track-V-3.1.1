import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import courseRoute from "./routes/course.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import AttendancesRoute from "./routes/attendance.route.js";
import dashboardRoute from "./routes/dashboard.route.js";
import subjectRoute from "./routes/subject.route.js";
import inputRoute from "./routes/input.route.js";
import calculatorRoute from "./routes/calculator.route.js";
import cors from "cors"

dotenv.config();

const app = express();

app.use(express.json({limit: "10mb"}));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use('/api/auth' , authRoute)
app.use('/api/courses' , courseRoute)
app.use('/api/attendances' , AttendancesRoute)
app.use('/api/dashboard' , dashboardRoute)
app.use('/api/subjects' , subjectRoute)
app.use("/api/input" , inputRoute)
app.use("/api/calculator" , calculatorRoute)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
});





