import Attendance from "../models/attendance.model.js";

export const getAttendanceStats = async(userId)=>{
    try {    
           // Calculate all metrics using aggregation
           const attendanceStats = await Attendance.aggregate([
               { $match: { user: userId } },
               { $group: {
                   _id: null,
                   totalclasses: { $sum: "$attendanceValue" },
                   totalclassesAttended: {
                       $sum: {
                           $cond: [{ $eq: ["$status", "present"] }, "$attendanceValue", 0]
                       }
                   },
                   totalclassesMissed: {
                       $sum: {
                           $cond: [{ $eq: ["$status", "absent"] }, "$attendanceValue", 0]
                       }
                   },
                   totalclassesCancelled: {
                       $sum: {
                           $cond: [{ $eq: ["$status", "cancelled"] }, "$attendanceValue", 0]
                       }
                   }
               }}
           ]);
           
           // Handle case when no records exist
           const stats = attendanceStats.length > 0 ? attendanceStats[0] : {
               totalclasses: 0,
               totalclassesAttended: 0,
               totalclassesMissed: 0,
               totalclassesCancelled: 0
           };
           
           // Remove the _id field from the response
           delete stats._id;
           
           return stats;
    } catch (error) {
        console.log(`Error in getAttendanceStats service ${error.message}`);
        throw new Error("Failed to get attendance stats" + error.message);
    }
}

export const getAttendanceStatsByCourse = async(userId , courseId)=>{
    try {
        const attendanceStats = await Attendance.aggregate([
            { $match: { user: userId , course: courseId } },
            { $group: {
                _id: null,
                totalclasses: { $sum: "$attendanceValue" },
                totalclassesAttended: { $sum: { $cond: [{ $eq: ["$status", "present"] }, "$attendanceValue", 0] } },
                totalclassesMissed: { $sum: { $cond: [{ $eq: ["$status", "absent"] }, "$attendanceValue", 0] } },
                totalclassesCancelled: { $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, "$attendanceValue", 0] } }
            }}
        ]);

        // Handle case when no records exist
        const stats = attendanceStats.length > 0 ? attendanceStats[0] : {
            totalclasses: 0,
            totalclassesAttended: 0,
            totalclassesMissed: 0,
            totalclassesCancelled: 0
        };
        
        // Remove the _id field from the response
        delete stats._id;
        
        return stats;
    } catch (error) {
        console.log(`Error in getAttendanceStatsByCourse service ${error.message}`);
        throw new Error("Failed to get attendance stats by course" + error.message);
    }
}
    
