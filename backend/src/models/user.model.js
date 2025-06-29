import mongoose from "mongoose";
import Attendance from './attendance.model.js'; 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId; // Password is required only if googleId is not present
        },
        minlength: [6, "Password must be at least 6 characters long"],
    },
    googleId: {
        type: String,
        sparse: true, // Allows null/undefined values but ensures uniqueness for non-null values
    },
    profilePicture: {
        type: String,
        default: "",
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }],
   
},
{
    timestamps: true,
}
)

userSchema.methods.getAttendanceStats = async function() {
   

  };
  
  userSchema.methods.getCourseStats = async function() {
    try {
        const attendances = await Attendance.find({ user: this._id }).populate('course');
        return this.calculateCourseStats(attendances);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get course stats");
    }

  };
  
 

userSchema.methods.calculateCourseStats = function(attendances) {
    const courseStatsMap = {};
    
    // First, process all attendances
    attendances.forEach(att => {
      const id = att.course._id.toString();
      if (!courseStatsMap[id]) {
        courseStatsMap[id] = {
          course: att.course,
          totalClasses: 0,
          classesAttended: 0
        };
      }
      courseStatsMap[id].totalClasses += 1;
      if (att.status === 'present') {
        courseStatsMap[id].classesAttended += 1;
      }
    });
  
    // Ensure all user courses are included, even those with zero attendance
    this.courses.forEach(course => {
      const id = course._id.toString();
      if (!courseStatsMap[id]) {
        courseStatsMap[id] = {
          course: course,
          totalClasses: 0,
          classesAttended: 0
        };
      }
    });
  
    // Transform the map into an array with calculated percentages
    return Object.values(courseStatsMap).map(entry => {
      const { course, classesAttended, totalClasses } = entry;
      const attendancePercentage = totalClasses > 0
        ? Math.round((classesAttended / totalClasses) * 100)
        : 0;
      
      return {
        ...course.toObject(),
        attendancePercentage,
        classesAttended,
        totalClasses
      };
    });
  };
  
  // Add method for weekly stats
  userSchema.methods.getWeeklyStats = async function() {
    const attendances = await mongoose.model('Attendance').find({ user: this._id }).populate('course');
    const weeklyAttendance = [];
    
    for (let i = 5; i >= 0; i--) {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay() - (7 * i));
      weekStart.setHours(0, 0, 0, 0);
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);
      
      const weekAttendances = attendances.filter(att => 
        att.markedAt >= weekStart && att.markedAt <= weekEnd
      );
      
      const weekTotal = weekAttendances.length;
      const weekPresent = weekAttendances.filter(att => att.status === 'present').length;
      const weekPercentage = weekTotal > 0 ? Math.round((weekPresent / weekTotal) * 100) : 0;
      
      weeklyAttendance.push({
        week: 6 - i,
        percentage: weekPercentage
      });
    }
    
    return weeklyAttendance;
  };
  
  // Add method for getting alerts
  userSchema.methods.getAttendanceAlerts = async function() {
    const attendances = await mongoose.model('Attendance').find({ user: this._id }).populate('course');
    const courseStats = this.calculateCourseStats(attendances);
    
    const alerts = {
      critical: [],
      warning: [],
      info: [],
      all: []
    };
  
    courseStats.forEach(stat => {
      const { title, attendancePercentage, totalClasses, classesAttended } = stat;
      
      if (totalClasses === 0) return;
  
      const classesNeededFor75Percent = Math.ceil((75 * totalClasses - 100 * classesAttended) / (100 - 75));
      
      if (attendancePercentage < 75) {
        alerts.critical.push({
          type: 'critical',
          title: `${title} - Critical Attendance Alert`,
          message: `Your attendance has dropped to ${attendancePercentage}%. You need to attend ${classesNeededFor75Percent > 0 ? classesNeededFor75Percent : 'more'} more classes to reach 75%.`,
          course: stat,
          percentage: attendancePercentage,
          timestamp: new Date()
        });
      } else if (attendancePercentage >= 75 && attendancePercentage < 80) {
        const canMissClasses = Math.floor((classesAttended - 0.75 * totalClasses) / 0.75);
        alerts.warning.push({
          type: 'warning',
          title: `${title} - Approaching Threshold`,
          message: `Your attendance is at ${attendancePercentage}%. Don't miss more than ${canMissClasses} class${canMissClasses !== 1 ? 'es' : ''} to stay above 75%.`,
          course: stat,
          percentage: attendancePercentage,
          timestamp: new Date()
        });
      } else if (attendancePercentage >= 90) {
        alerts.info.push({
          type: 'info',
          title: `${title} - Excellent Attendance`,
          message: `Great job! Your attendance is at ${attendancePercentage}%, well above the required threshold.`,
          course: stat,
          percentage: attendancePercentage,
          timestamp: new Date()
        });
      }
    });
  
    alerts.all = [...alerts.critical, ...alerts.warning, ...alerts.info];
    return alerts;
  };

const User =  mongoose.model("User", userSchema);

export default User;