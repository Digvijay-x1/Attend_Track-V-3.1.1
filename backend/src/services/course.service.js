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

export const getUserCoursesWithAttendancePercentage = async(userId) => {
    try {
        // Get all courses for the user
        const courses = await Course.find({user: userId});
        const coursesWithAttendance = [];
        
        // For each course, calculate attendance percentage
        for(const course of courses){
            const attendanceStats = await getAttendanceStatsByCourse(userId, course._id);
            
            // Calculate attendance percentage
            const attendancePercentage = attendanceStats.totalclasses > 0 
                ? (attendanceStats.totalclassesAttended / attendanceStats.totalclasses) * 100 
                : 0; // If no classes yet, consider it 0%
            
            // Add course with attendance data
            coursesWithAttendance.push({
                _id: course._id,
                title: course.title,
                code: course.code,
                profName: course.profName,
                type: course.type,
                schedule: course.schedule,
                totalClasses: attendanceStats.totalclasses,
                attendedClasses: attendanceStats.totalclassesAttended,
                attendancePercentage: Math.round(attendancePercentage * 100) / 100 // Round to 2 decimal places
            });
        }
        
        // Sort by attendance percentage (highest first)
        coursesWithAttendance.sort((a, b) => b.attendancePercentage - a.attendancePercentage);
        
        return coursesWithAttendance;
    } catch (error) {
        console.log(`Error in getUserCoursesWithAttendance service ${error.message}`);
        throw new Error("Failed to get courses with attendance data: " + error.message);
    }
}

export const totalHoursOfClassesPerWeek = async (userId) => {
    try {
      
      const courses = await Course.find({ user: userId });
      let totalMinutes = 0;
  
      for (const course of courses) {
        for (const schedule of course.schedule) {
          const [startHour, startMinute] = schedule.startTime.split(':').map(Number);
          const [endHour, endMinute] = schedule.endTime.split(':').map(Number);
  
          const durationInMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
          totalMinutes += durationInMinutes;
        }
      }
  
      const totalHours = totalMinutes / 60;
      return totalHours.toFixed(1);
  
    } catch (error) {
      console.error(`Error in totalHoursOfClassesPerWeek service: ${error.message}`);
      throw new Error("Failed to get total hours of classes per week: " + error.message);
    }
  };

