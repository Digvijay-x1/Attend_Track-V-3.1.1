import Course from '../models/course.model.js';
import Attendance from '../models/attendance.model.js';

export const todaySchedule = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 6 = Saturday

    // Find courses for the user that have at least one schedule entry matching today's day
    const coursesToday = await Course.find({
      user: userId,
      schedule: {
        $elemMatch: {
          dayOfWeek: currentDay
        }
      }
    });

    res.status(200).json({ coursesToday });
  } catch (error) {
    console.error("Error in todaySchedule controller:", error.message);
    res.status(500).json({ message: "Internal server error in todaySchedule controller" });
  }
};

export const recentAttendance = async (req, res) => {
    try {
        const userId = req.user._id;
        const recentAttendance = await Attendance.find({ user: userId }).sort({ createdAt: -1 }).limit(3);
        res.status(200).json({ recentAttendance });
    } catch (error) {
        console.error("Error in recentAttendance controller:", error.message);
        res.status(500).json({ message: "Internal server error in recentAttendance controller" });
    }
};