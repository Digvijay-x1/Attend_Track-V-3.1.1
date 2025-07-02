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

// Connect to database
connectDB();

app.use(express.json({limit: "10mb"}));
app.use(cookieParser());

// Updated CORS configuration for both development and production
app.use(cors({
    origin: process.env.NODE_ENV === "production" 
        ? process.env.FRONTEND_URL 
        : "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token", "X-Requested-With", "Accept", "Accept-Version", "Content-Length", "Content-MD5", "Date", "X-Api-Version"],
    exposedHeaders: ["Set-Cookie"],
    credentials: true,
}));

app.use('/api/auth', authRoute);
app.use('/api/courses', courseRoute);
app.use('/api/attendances', AttendancesRoute);
app.use('/api/dashboard', dashboardRoute);
app.use('/api/subjects', subjectRoute);
app.use("/api/input", inputRoute);
app.use("/api/calculator", calculatorRoute);

app.get('/', (req, res) => {
    res.send("Hello from Attend Track API");
});

// For local development
if(process.env.NODE_ENV === 'development'){
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Required for Vercel serverless deployment
export default app;





