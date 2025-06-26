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

export const totalAttendancePerWeek = async (userId) => {
    try {
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  
      const stats = await Attendance.aggregate([
        { $match: { user: userId, markedAt: { $gte: oneWeekAgo } } },
        {
          $group: {
            _id: null,
            totalClasses: { $sum: "$attendanceValue" },
            totalClassesAttended: {
              $sum: {
                $cond: [{ $eq: ["$status", "present"] }, "$attendanceValue", 0],
              },
            },
            totalClassesMissed: {
              $sum: {
                $cond: [{ $eq: ["$status", "absent"] }, "$attendanceValue", 0],
              },
            },
            totalClassesCancelled: {
              $sum: {
                $cond: [{ $eq: ["$status", "cancelled"] }, "$attendanceValue", 0],
              },
            },
          },
        },
      ]);
  
      // In case there’s no data for the past week
      const {
        totalClasses = 0,
        totalClassesAttended = 0,
        totalClassesMissed = 0,
        totalClassesCancelled = 0,
      } = stats[0] || {};
  
      return {
        totalClasses,
        totalClassesAttended,
        totalClassesMissed,
        totalClassesCancelled,
      };
    } catch (error) {
      console.error(`Error in totalAttendancePerWeek service: ${error.message}`);
      throw new Error("Failed to get total attendance per week: " + error.message);
    }
  };

  export const weeklyAttendanceStats = async (userId) => {
    try {
      const fourWeeksAgo = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000);
  
      const stats = await Attendance.aggregate([
        {
          $match: {
            user: userId,
            markedAt: { $gte: fourWeeksAgo },
          },
        },
        {
          $group: {
            _id: {
              isoWeek: { $isoWeek: "$markedAt" },
              isoYear: { $isoWeekYear: "$markedAt" },
            },
            totalClasses: { $sum: "$attendanceValue" },
            totalClassesAttended: {
              $sum: {
                $cond: [{ $eq: ["$status", "present"] }, "$attendanceValue", 0],
              },
            },
            totalClassesMissed: {
              $sum: {
                $cond: [{ $eq: ["$status", "absent"] }, "$attendanceValue", 0],
              },
            },
            totalClassesCancelled: {
              $sum: {
                $cond: [{ $eq: ["$status", "cancelled"] }, "$attendanceValue", 0],
              },
            },
          },
        },
        {
          $sort: { "_id.isoYear": 1, "_id.isoWeek": 1 },
        },
        {
          $project: {
            _id: 0,
            weekLabel: {
              $concat: [
                "Week ",
                { $toString: "$_id.isoWeek" },
                " (",
                { $toString: "$_id.isoYear" },
                ")",
              ],
            },
            totalClasses: 1,
            totalClassesAttended: 1,
            totalClassesMissed: 1,
            totalClassesCancelled: 1,
          },
        },
      ]);
  
      return stats;
    } catch (error) {
      console.error(`Error in weeklyAttendanceStats service: ${error.message}`);
      throw new Error("Failed to get weekly attendance stats: " + error.message);
    }
  };

