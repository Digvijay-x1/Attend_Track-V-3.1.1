import Course from "../models/course.model.js";
import { getAttendanceStatsByCourse } from "./attendance.service.js";

export const totalCourses = async(userId)=>{
    try {
        const courses = await Course.find({user: userId});
        return courses.length;
    } catch (error) {
        console.log(`Error in totalCourses service ${error.message}`);
        throw new Error("Failed to get total courses" + error.message);
    }
}

export const lowAttendanceCourses = async(userId)=>{
    // lower than 75% attendance
    try {
        const courses = await Course.find({user: userId});
        const lowAttendanceCourses = [];
        
        for(const course of courses){
            const attendanceStats = await getAttendanceStatsByCourse(userId, course._id);
            
            // Calculate attendance percentage
            const attendancePercentage = attendanceStats.totalclasses > 0 
                ? (attendanceStats.totalclassesAttended / attendanceStats.totalclasses) * 100 
                : 100; // If no classes yet, consider it 100%
            
            // Check if attendance is below 75%
            if(attendancePercentage < 75 && attendanceStats.totalclasses > 0){
                // Add attendance percentage to course object
                lowAttendanceCourses.push({
                    ...course.toObject(),
                    attendancePercentage: Math.round(attendancePercentage * 100) / 100 // Round to 2 decimal places
                });
            }
        }
        
        // Sort by attendance percentage (lowest first)
        lowAttendanceCourses.sort((a, b) => a.attendancePercentage - b.attendancePercentage);
        
        return lowAttendanceCourses;
    } catch (error) {
        console.log(`Error in lowAttendanceCourses service ${error.message}`);
        throw new Error("Failed to get low attendance courses" + error.message);
    }
}