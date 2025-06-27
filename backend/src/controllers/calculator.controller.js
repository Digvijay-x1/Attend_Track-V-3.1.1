import { getUserCoursesWithAttendancePercentage } from "../services/course.service.js";

export const calculatorController = async (req, res) => {
    // user will send the course code , target attendance percentage , expected future classes .
    try {
        const userId = req.user._id;
        const coursesWithAttendancePercentage = await getUserCoursesWithAttendancePercentage(userId);
        
        // match the course code with the coursesWithAttendancePercentage and get the current attendance percentage
        const course = coursesWithAttendancePercentage.find(course => course.code === req.body.code);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const currentAttendancePercentage = course.attendancePercentage;
        const currentTotalClasses = course.totalClasses;
        const currentAttendedClasses = course.attendedClasses;
        const targetAttendancePercentage = req.body.targetAttendancePercentage;
        const expectedFutureClasses = req.body.expectedFutureClasses;

        // Calculate total classes after adding future classes
        const finalTotalClasses = currentTotalClasses + expectedFutureClasses;

        // Calculate required attended classes to meet target percentage
        const requiredAttendedClasses = Math.ceil((targetAttendancePercentage / 100) * finalTotalClasses);

        // Calculate how many more classes need to be attended
        const additionalClassesNeeded = requiredAttendedClasses - currentAttendedClasses;

        // Calculate minimum required classes for 75% attendance
        const minimumRequiredClasses = Math.ceil(0.75 * finalTotalClasses);
        const minimumAdditionalClassesNeeded = minimumRequiredClasses - currentAttendedClasses;

        // Prepare the response
        const response = {
            currentStats: {
                totalClasses: currentTotalClasses,
                attendedClasses: currentAttendedClasses,
                currentPercentage: currentAttendancePercentage
            },
            futureStats: {
                expectedNewClasses: expectedFutureClasses,
                finalTotalClasses: finalTotalClasses
            },
            targetStats: {
                targetPercentage: targetAttendancePercentage,
                classesNeededForTarget: Math.max(0, additionalClassesNeeded),
                canMissClasses: Math.max(0, expectedFutureClasses - additionalClassesNeeded)
            },
            minimumStats: {
                minimumRequiredPercentage: 75,
                classesNeededForMinimum: Math.max(0, minimumAdditionalClassesNeeded)
            },
            isTargetPossible: additionalClassesNeeded <= expectedFutureClasses,
            isMinimumPossible: minimumAdditionalClassesNeeded <= expectedFutureClasses
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error in calculatorController:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}