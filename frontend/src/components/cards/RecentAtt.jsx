import React from 'react'

const RecentAtt = ({recentAttendance = {}}) => {
  const attendanceList = recentAttendance?.recentAttendance || [];
  
  const getStatusStyles = (status) => {
    switch(status.toLowerCase()) {
      case 'present':
        return {
          dotColor: 'bg-success',
          textColor: 'text-success',
          bgColor: 'bg-success/10'
        };
      case 'absent':
        return {
          dotColor: 'bg-error',
          textColor: 'text-error',
          bgColor: 'bg-error/10'
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
          bgColor: 'bg-base-content/5'
        };
    }
  };

  return (
    <div className='flex flex-col gap-3'>   
      {attendanceList.map((attendance) => {
        const { dotColor, textColor, bgColor } = getStatusStyles(attendance.status);
        
        return (
          <div 
            key={attendance._id} 
            className={`flex items-center justify-between p-3 rounded-lg ${bgColor}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
              <h2 className="font-medium text-base-content">{attendance.course.code}</h2>
            </div>
            <span className={`text-sm font-medium ${textColor} capitalize`}>
              {attendance.status}
            </span>
          </div>
        );
      })}
      
      {attendanceList.length === 0 && (
        <div className="text-center text-base-content/70">
          No recent attendance records
        </div>
      )}
    </div>
  )
}

export default RecentAtt