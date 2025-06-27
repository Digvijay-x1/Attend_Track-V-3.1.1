import { totalCourses, totalHoursOfClassesPerWeek } from "../services/course.service.js";
import { getAttendanceStats } from "../services/attendance.service.js";

export const getSubjectsData = async(req , res)=>{
    try {
        // error handling
        if(!req.user){
            return res.status(401).json({message: "Unauthorized"});
        }

        const userId = req.user._id;
        // total subjects 
        const totalSubjects = await totalCourses(userId);

        // weekly classes in hours 
        const weeklyClassesInHours = await totalHoursOfClassesPerWeek(userId);


        // avg attendance
        const attendanceStats  = await getAttendanceStats(userId);
        const avgAttendance = ((attendanceStats.totalclassesAttended / attendanceStats.totalclasses) * 100 || 0).toFixed(1);

        if(!totalSubjects || !weeklyClassesInHours || !avgAttendance){
            return res.status(400).json({message: "No subjects found"});
        }

        res.status(200).json({
            totalSubjects,
            weeklyClassesInHours,
            avgAttendance
        })
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log(`Error in getSubjects controller ${error.message}`);
    }
}