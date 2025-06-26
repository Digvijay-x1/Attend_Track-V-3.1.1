import { getAttendanceStats , totalAttendancePerWeek , weeklyAttendanceStats } from "../services/attendance.service.js";
import { lowAttendanceCourses, getUserCoursesWithAttendancePercentage    } from "../services/course.service.js";

export const getDashboardData = async(req , res)=>{
    try {
        const userId = req.user._id;
        const attendanceStats  = await getAttendanceStats(userId);
        const attendancePerWeek = await totalAttendancePerWeek(userId);
        const totalLowAttendanceCourses = (await lowAttendanceCourses(userId)).length;

        // get percentage of attendance for each course
        const coursesWithAttendancePercentage = await getUserCoursesWithAttendancePercentage(userId);
        const stats = await weeklyAttendanceStats(userId);
        res.status(200).json({
            attendanceStats, 
            totalLowAttendanceCourses, 
            attendancePerWeek,
            coursesWithAttendancePercentage,
            stats
        });
    } catch (error) {
        console.log(`Error in getDashboardData controller ${error.message}`);
        res.status(500).json({message: "Internal server error in dashboard controller: " + error.message});
    }
}

