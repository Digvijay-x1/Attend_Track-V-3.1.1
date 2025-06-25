import Attendance from "../models/attendance.model.js";

export const markAttendance = async(req , res)=>{
    try {
       const {courseId} = req.params;
       const userId = req.user._id;
       const {status , attendanceValue} = req.body;

       // Validate required fields
       if (!status) {
           return res.status(400).json({
               message: "Status is required (present, absent, or cancelled)"
           });
       }

       // Validate status enum values
       if (!['present', 'absent', 'cancelled'].includes(status)) {
           return res.status(400).json({
               message: "Invalid status value. Must be 'present', 'absent', or 'cancelled'"
           });
       }

       // Validate attendanceValue if provided
       if (attendanceValue !== undefined && typeof attendanceValue !== 'number') {
           return res.status(400).json({
               message: "AttendanceValue must be a number"
           });
       }

       const newAttendance = new Attendance({
           course: courseId,
           user: userId,
           status,
           attendanceValue: attendanceValue || 1  // Use default if not provided
       });

   

       await newAttendance.save();

       

       res.status(201).json({message: "Attendance marked successfully", attendance: newAttendance});

    } catch (error) {
        console.log(`Error in markAttendance controller ${error.message}`);
        res.status(500).json({message: "Internal server error in attendance controller: " + error.message});
    }
}

export const getAttendance = async(req , res)=>{
    try {
        const {courseId} = req.params;
        const userId = req.user._id;

        const attendances = await Attendance.find({course: courseId , user: userId});
        res.status(200).json({message: "Attendances fetched successfully", attendances});
    } catch (error) {
        console.log(`Error in getAttendance controller ${error.message}`);
        res.status(500).json({message: "Internal server error in attendance controller: " + error.message});
    }
}
