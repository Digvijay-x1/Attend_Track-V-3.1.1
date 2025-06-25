import Course from "../models/course.model.js";

export const totalCourses = async(userId)=>{
    try {
        const courses = await Course.find({user: userId});
        return courses.length;
    } catch (error) {
        console.log(`Error in totalCourses service ${error.message}`);
        throw new Error("Failed to get total courses" + error.message);
    }
}