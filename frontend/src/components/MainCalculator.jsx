import React, { useState, useEffect } from 'react'
import { useCalculatorStore } from '../store/useCalculator.store'

const MainCalculator = () => {
    const { 
        courseList, 
        isLoading, 
        fetchCourseList, 
        postDataFromCalculator,
        calculatorResult 
    } = useCalculatorStore();
    
    const [selectedCourse, setSelectedCourse] = useState('');
    const [targetPercentage, setTargetPercentage] = useState(75);
    const [futureClasses, setFutureClasses] = useState(0);

    useEffect(() => {
        console.log("Fetching course list...");
        fetchCourseList();
    }, [fetchCourseList]);

    // Debug logging
    useEffect(() => {
        console.log("Current courseList:", courseList);
    }, [courseList]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedCourse) return;
        
        console.log("Submitting calculator data:", {
            code: selectedCourse,
            targetAttendancePercentage: targetPercentage,
            expectedFutureClasses: parseInt(futureClasses)
        });
        
        postDataFromCalculator({
            code: selectedCourse,
            targetAttendancePercentage: targetPercentage,
            expectedFutureClasses: parseInt(futureClasses)
        });
    };

    // Ensure courseList is always an array
    const courses = Array.isArray(courseList) ? courseList : [];
    
    console.log("Rendering with courses:", courses);

    return (
        <div className="p-3 sm:p-6">
            <div className="flex items-center mb-4">
                <div className="text-primary mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-base-content">Detailed Calculator</h2>
            </div>
            
            {isLoading && (
                <div className="flex justify-center py-4">
                    <span className="loading loading-spinner loading-md text-primary"></span>
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="mb-6 space-y-4 bg-base-300 p-3 sm:p-4 rounded-lg">
                <div>
                    <label className="block mb-1 font-medium text-base-content">Select Subject</label>
                    <select 
                        value={selectedCourse} 
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="w-full p-2 rounded select select-bordered text-sm sm:text-base max-w-full text-base-content"
                        required
                        style={{ textOverflow: 'ellipsis' }}
                    >
                        <option value="">Select a course</option>
                        {courses.map((course) => {
                            // Create a shorter display for small screens
                            const title = course.name || course.title;
                            const code = course.code;
                            return (
                                <option key={course._id} value={code} className="text-wrap">
                                    {`${title} (${code})`}
                                </option>
                            );
                        })}
                    </select>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium text-base-content">Target Attendance (%)</label>
                        <input 
                            type="number" 
                            value={targetPercentage}
                            onChange={(e) => setTargetPercentage(Number(e.target.value))}
                            className="w-full p-2 rounded input input-bordered text-base-content"
                            min="0"
                            max="100"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block mb-1 font-medium text-base-content">Expected Future Classes</label>
                        <input 
                            type="number" 
                            value={futureClasses}
                            onChange={(e) => setFutureClasses(e.target.value)}
                            className="w-full p-2 rounded input input-bordered text-base-content"
                            min="0"
                            required
                        />
                    </div>
                </div>
                
                <button 
                    type="submit" 
                    className="btn btn-primary w-full text-primary-content"
                    disabled={isLoading}
                >
                    {isLoading ? 'Calculating...' : 'Calculate'}
                </button>
            </form>
            
            {calculatorResult && (
                <div className="border border-base-300 rounded-lg p-3 sm:p-4 bg-base-300">
                    <h3 className="font-bold mb-3 sm:mb-4 text-lg text-base-content">Results</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="border border-base-content/10 p-3 sm:p-4 rounded-lg bg-base-200 shadow-sm">
                            <h4 className="font-semibold mb-2 text-primary text-sm sm:text-base">Current Status</h4>
                            <p className="mb-1 text-base-content text-sm sm:text-base">Total Classes: <span className="font-medium">{calculatorResult.currentStats.totalClasses}</span></p>
                            <p className="mb-1 text-base-content text-sm sm:text-base">Attended Classes: <span className="font-medium">{calculatorResult.currentStats.attendedClasses}</span></p>
                            <p className="text-base-content text-sm sm:text-base">Current Percentage: <span className="font-medium">{calculatorResult.currentStats.currentPercentage}%</span></p>
                        </div>
                        
                        <div className="border border-base-content/10 p-3 sm:p-4 rounded-lg bg-base-200 shadow-sm">
                            <h4 className="font-semibold mb-2 text-primary text-sm sm:text-base">Future Projection</h4>
                            <p className="mb-1 text-base-content text-sm sm:text-base">Expected New Classes: <span className="font-medium">{calculatorResult.futureStats.expectedNewClasses}</span></p>
                            <p className="text-base-content text-sm sm:text-base">Final Total Classes: <span className="font-medium">{calculatorResult.futureStats.finalTotalClasses}</span></p>
                        </div>
                        
                        <div className="border border-base-content/10 p-3 sm:p-4 rounded-lg bg-base-200 shadow-sm">
                            <h4 className="font-semibold mb-2 text-primary text-sm sm:text-base">Target ({calculatorResult.targetStats.targetPercentage}%)</h4>
                            <p className="mb-1 text-base-content text-sm sm:text-base">Classes Needed: <span className="font-medium">{calculatorResult.targetStats.classesNeededForTarget}</span></p>
                            <p className="mb-1 text-base-content text-sm sm:text-base">Can Miss: <span className="font-medium">{calculatorResult.targetStats.canMissClasses}</span></p>
                            <p className={`${calculatorResult.isTargetPossible ? "text-success font-medium" : "text-error font-medium"} text-sm sm:text-base`}>
                                {calculatorResult.isTargetPossible ? "Target is achievable" : "Target is not achievable"}
                            </p>
                        </div>
                        
                        <div className="border border-base-content/10 p-3 sm:p-4 rounded-lg bg-base-200 shadow-sm">
                            <h4 className="font-semibold mb-2 text-primary text-sm sm:text-base">Minimum Requirement (75%)</h4>
                            <p className="mb-1 text-base-content text-sm sm:text-base">Classes Needed: <span className="font-medium">{calculatorResult.minimumStats.classesNeededForMinimum}</span></p>
                            <p className={`${calculatorResult.isMinimumPossible ? "text-success font-medium" : "text-error font-medium"} text-sm sm:text-base`}>
                                {calculatorResult.isMinimumPossible ? "Minimum requirement is achievable" : "Minimum requirement is not achievable"}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MainCalculator