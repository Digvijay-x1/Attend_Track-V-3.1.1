import React, { useEffect, useState } from 'react'

const RecentAtt = ({recentAttendance = {}}) => {
  const attendanceList = recentAttendance?.recentAttendance || [];
  const [newAttendances, setNewAttendances] = useState({});
  
  // Track new attendance records with animation effect
  useEffect(() => {
    if (attendanceList.length > 0) {
      const newIds = {};
      attendanceList.forEach(att => {
        newIds[att._id] = true;
      });
      
      setNewAttendances(newIds);
      
      // Clear the "new" status after animation completes
      const timer = setTimeout(() => {
        setNewAttendances({});
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [attendanceList]);
  
  const getStatusStyles = (status) => {
    switch(status.toLowerCase()) {
      case 'present':
        return {
          dotColor: 'bg-success',
          textColor: 'text-success',
          bgColor: 'bg-success/5'
        };
      case 'absent':
        return {
          dotColor: 'bg-error',
          textColor: 'text-error',
          bgColor: 'bg-error/5'
        };
      case 'canceled':
        return {
          dotColor: 'bg-base-content/30',
          textColor: 'text-base-content/70',
          bgColor: 'bg-base-content/5'
        };
      default:
        return {
          dotColor: 'bg-base-content/30',
          textColor: 'text-base-content/70',
          bgColor: 'bg-base-100'
        };
    }
  };

  if (attendanceList.length === 0) {
    return (
      <div className="text-center py-2 text-base-content/70 text-sm">
        No recent attendance records
      </div>
    );
  }

  return (
    <div className='space-y-2'>   
      {attendanceList.map((attendance) => {
        const { dotColor, textColor, bgColor } = getStatusStyles(attendance.status);
        const isNew = newAttendances[attendance._id];
        
        return (
          <div 
            key={attendance._id} 
            className={`flex items-center justify-between p-2 rounded-md ${bgColor} border border-base-300/20
              ${isNew ? 'animate-pulse shadow-md' : ''}`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
              <div>
                <h2 className="text-sm font-medium text-base-content">{attendance.course.code}</h2>
                <p className="text-xs text-base-content/70">{new Date(attendance.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              </div>
            </div>
            <span className={`text-xs font-medium ${textColor} capitalize`}>
              {attendance.status}
            </span>
          </div>
        );
      })}
    </div>
  )
}

export default RecentAtt