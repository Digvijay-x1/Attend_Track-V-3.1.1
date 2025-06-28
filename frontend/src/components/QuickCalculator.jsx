import React, { useState, useEffect } from 'react';

const QuickCalculator = () => {
  const [attended, setAttended] = useState('');
  const [total, setTotal] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [scenarios, setScenarios] = useState({
    attend5: 0,
    miss2: 0,
    attend10: 0
  });
  const [goals, setGoals] = useState({
    goal75: 0,
    goal80: 0,
    goal85: 0
  });
  const [error, setError] = useState('');

  // Handle attended classes input
  const handleAttendedChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && !value.includes('.'))) {
      setAttended(value);
      // Clear error if total is valid in relation to attended
      if (value === '' || total === '' || Number(value) <= Number(total)) {
        setError('');
      } else {
        setError('Attended classes cannot be more than total classes');
      }
    }
  };

  // Handle total classes input
  const handleTotalChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && !value.includes('.'))) {
      setTotal(value);
      // Clear error if attended is valid in relation to total
      if (value === '' || attended === '' || Number(attended) <= Number(value)) {
        setError('');
      } else {
        setError('Attended classes cannot be more than total classes');
      }
    }
  };

  // Calculate current percentage and scenarios when inputs change
  useEffect(() => {
    const attendedNum = Number(attended);
    const totalNum = Number(total);
    
    if (attendedNum > 0 && totalNum > 0 && attendedNum <= totalNum) {
      // Calculate current percentage
      const currentPercentage = Math.round((attendedNum / totalNum) * 100);
      setPercentage(currentPercentage);
      
      // Calculate scenarios
      const attend5Percentage = Math.round(((attendedNum + 5) / (totalNum + 5)) * 100);
      const miss2Percentage = Math.round((attendedNum / (totalNum + 2)) * 100);
      const attend10Percentage = Math.round(((attendedNum + 10) / (totalNum + 10)) * 100);
      
      setScenarios({
        attend5: attend5Percentage - currentPercentage,
        miss2: miss2Percentage - currentPercentage,
        attend10: attend10Percentage - currentPercentage
      });
      
      // Calculate classes needed to reach goals
      const classesFor75 = calculateClassesNeeded(attendedNum, totalNum, 75);
      const classesFor80 = calculateClassesNeeded(attendedNum, totalNum, 80);
      const classesFor85 = calculateClassesNeeded(attendedNum, totalNum, 85);
      
      setGoals({
        goal75: classesFor75,
        goal80: classesFor80,
        goal85: classesFor85
      });
    } else {
      setPercentage(0);
      setScenarios({ attend5: 0, miss2: 0, attend10: 0 });
      setGoals({ goal75: 0, goal80: 0, goal85: 0 });
    }
  }, [attended, total]);

  // Helper function to calculate classes needed to reach a goal
  const calculateClassesNeeded = (attended, total, goalPercentage) => {
    if (total === 0) return 0;
    
    // If already at or above goal, return 0
    const currentPercentage = (attended / total) * 100;
    if (currentPercentage >= goalPercentage) return 0;
    
    // Calculate how many more classes needed to attend
    // Formula: (goalPercentage/100) * (total + x) = attended + x
    // Solve for x: x = (goalPercentage*total - 100*attended)/(100 - goalPercentage)
    const classesNeeded = Math.ceil((goalPercentage * total - 100 * attended) / (100 - goalPercentage));
    return Math.max(0, classesNeeded);
  };

  return (
    <div className="bg-base-200 rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <div className="text-primary mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-base-content">Quick Calculator</h2>
      </div>
      
      {/* Current Percentage Section */}
      <div className="bg-base-300 p-4 rounded-lg mb-4">
        <h3 className="font-medium mb-3 text-base-content">Current Percentage</h3>
        <div className="flex gap-3 mb-2">
          <div className="flex-1">
            <input
              type="number"
              placeholder="Attended"
              className={`w-full p-2 rounded input input-bordered ${error ? 'input-error' : ''} text-base-content`}
              value={attended}
              onChange={handleAttendedChange}
              min="0"
            />
          </div>
          <div className="flex-1">
            <input
              type="number"
              placeholder="Total"
              className={`w-full p-2 rounded input input-bordered ${error ? 'input-error' : ''} text-base-content`}
              value={total}
              onChange={handleTotalChange}
              min="0"
            />
          </div>
        </div>
        {error && <p className="text-error text-sm mb-2">{error}</p>}
        <div className="text-right">
          <span className="font-medium text-base-content">Percentage: {percentage}%</span>
        </div>
      </div>
      
      {/* What If Scenarios Section */}
      <div className="bg-base-300 p-4 rounded-lg mb-4">
        <h3 className="font-medium mb-3 text-base-content">What If Scenarios</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-base-content/70">If I attend next 5 classes</span>
            <span className={`font-medium ${scenarios.attend5 >= 0 ? "text-success" : "text-error"}`}>
              {scenarios.attend5 > 0 ? `+${scenarios.attend5}%` : `${scenarios.attend5}%`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-base-content/70">If I miss next 2 classes</span>
            <span className={`font-medium ${scenarios.miss2 >= 0 ? "text-success" : "text-error"}`}>
              {scenarios.miss2 > 0 ? `+${scenarios.miss2}%` : `${scenarios.miss2}%`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-base-content/70">If I attend next 10 classes</span>
            <span className={`font-medium ${scenarios.attend10 >= 0 ? "text-success" : "text-error"}`}>
              {scenarios.attend10 > 0 ? `+${scenarios.attend10}%` : `${scenarios.attend10}%`}
            </span>
          </div>
        </div>
      </div>
      
      {/* Goal Tracker Section */}
      <div className="bg-base-300 p-4 rounded-lg">
        <h3 className="font-medium mb-3 text-base-content">Goal Tracker</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-base-content/70">To reach 75%:</span>
            <span className="text-warning font-medium">Need {goals.goal75} more</span>
          </div>
          <div className="flex justify-between">
            <span className="text-base-content/70">To reach 80%:</span>
            <span className="text-warning font-medium">Need {goals.goal80} more</span>
          </div>
          <div className="flex justify-between">
            <span className="text-base-content/70">To reach 85%:</span>
            <span className="text-warning font-medium">Need {goals.goal85} more</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickCalculator; 