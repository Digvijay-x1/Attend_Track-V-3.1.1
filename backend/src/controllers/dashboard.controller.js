import { getAttendanceStats } from "../services/attendance.service.js";
import { lowAttendanceCourses} from "../services/course.service.js";
export const getDashboardData = async(req , res)=>{
    try {
        const userId = req.user._id;
        const attendanceStats  = await getAttendanceStats(userId);
        const totalLowAttendanceCourses = (await lowAttendanceCourses(userId)).length;

        res.status(200).json({attendanceStats , totalLowAttendanceCourses});
    } catch (error) {
        console.log(`Error in getDashboardData controller ${error.message}`);
        res.status(500).json({message: "Internal server error in dashboard controller: " + error.message});
    }
}