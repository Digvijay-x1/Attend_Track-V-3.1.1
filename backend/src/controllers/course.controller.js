import Course from "../models/course.model.js";
export const createCourse = async(req , res)=>{
    const {title , profName , code , schedule} = req.body;
    try {
        const newCourse = new Course({title , profName , code , schedule , user: req.user._id})
        await newCourse.save();
        res.status(201).json({message: "Course created successfully", course: newCourse})
    } catch (error) {
        console.log(`Error in createCourse controller ${error.message}`);
        res.status(500).json({message: "Internal server error in course controller" + error.message});
    }
}


export const getCourses = async(req , res)=>{
    try {
        const courses = await Course.find({user: req.user._id});
        res.status(200).json({message: "Courses fetched successfully", courses})
    } catch (error) {
        console.log(`Error in getCourses controller ${error.message}`);
        res.status(500).json({message: "Internal server error in course controller" + error.message});
    }
}

export const updateCourse = async(req , res)=>{
    const {id} = req.params;
    const {title , profName , code , schedule} = req.body;
    try {
        const updatedCourse = await Course.findByIdAndUpdate(id , {title , profName , code , schedule} , {new: true});
        res.status(200).json({message: "Course updated successfully", course: updatedCourse})
    } catch (error) {
        console.log(`Error in updateCourse controller ${error.message}`);
        res.status(500).json({message: "Internal server error in course controller" + error.message});
    }
}

export const deleteCourse = async(req , res)=>{
    const {id} = req.params;
    try {
        await Course.findByIdAndDelete(id);
        res.status(200).json({message: "Course deleted successfully"})
    } catch (error) {
        console.log(`Error in deleteCourse controller ${error.message}`);
        res.status(500).json({message: "Internal server error in course controller" + error.message});
    }
}