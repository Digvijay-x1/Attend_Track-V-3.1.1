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
        required: true,
        minlength: [6, "Password must be at least 6 characters long"],
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
    try {
        const attendances = await Attendance.find({ user: this._id }).populate('course');
        return {
          totalClasses: attendances.length,
          classesAttended: attendances.filter(att => att.status === 'present').length
        };
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get attendance stats");
    }

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
    // Move the course stats calculation logic here from routes
    return courseStatsMap;
  };

const User =  mongoose.model("User", userSchema);

export default User;