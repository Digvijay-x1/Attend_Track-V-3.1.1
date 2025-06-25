import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    markedAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['present', 'absent'],
    },

})

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;