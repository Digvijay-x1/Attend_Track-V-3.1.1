import React from 'react'
import { Edit, Trash2 } from 'lucide-react'

const SubjectCard = ({ course = {} }) => {
    const { title, profName, code, schedule, attendancePercentage = 0, totalClasses = 0, attendedClasses = 0 } = course || {};

    // above 90% excellent, above 85% good, above 75% warning, below 75% poor
    const status = attendancePercentage > 90 ? 'Excellent' : attendancePercentage > 85 ? 'Good' : attendancePercentage > 75 ? 'Warning' : 'Poor';

    const getStatusColor = (status) => {
        if (status === 'Excellent') return 'bg-success/20 text-success';
        if (status === 'Good') return 'bg-info/20 text-info';
        if (status === 'Warning') return 'bg-warning/20 text-warning';
        return 'bg-error/20 text-error';
    };

    const getProgressBarColor = (attendance) => {
        if (attendance >= 90) return 'bg-success';
        if (attendance >= 85) return 'bg-info';
        if (attendance >= 75) return 'bg-warning';
        return 'bg-error';
    };

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <div className='bg-base-100 rounded-xl p-6 shadow-lg border border-base-200'>
            <div className='flex justify-between items-start mb-4'>
                <div>
                    <h3 className='text-lg font-bold text-base-content'>{title}</h3>
                    <p className='text-sm text-base-content/70'>{profName}</p>
                    <p className='text-sm text-base-content/50'>{code}</p>
                </div>
                <div className='flex gap-2'>
                    <button className='btn btn-sm btn-ghost'><Edit className='w-4 h-4' /></button>
                    <button className='btn btn-sm btn-ghost text-error'><Trash2 className='w-4 h-4' /></button>
                </div>
            </div>

            <div className='space-y-1 mb-6'>
                {schedule?.map((item) => (
                    <div key={item._id} className='flex items-center gap-2 text-sm text-base-content/70'>
                        <span className='font-medium'>{days[item.dayOfWeek]}</span>
                        <span>•</span>
                        <span>{item.startTime} - {item.endTime}</span>
                    </div>
                ))}
            </div>

            <div className='mb-4'>
                <div className='flex justify-between items-baseline mb-2'>
                    <span className='text-sm font-medium text-base-content/70'>Attendance</span>
                    <span className='text-2xl font-bold text-base-content'>{attendancePercentage.toFixed(1)}%</span>
                </div>
                <div className='w-full h-2 bg-base-200 rounded-full mb-2'>
                    <div
                        className={`h-2 rounded-full ${getProgressBarColor(attendancePercentage)}`}
                        style={{ width: `${attendancePercentage}%` }}
                    ></div>
                </div>
                <div className='flex justify-between text-sm text-base-content/70'>
                    <span>Total: {totalClasses}</span>
                    <span>Present: {attendedClasses}</span>
                    <span>Absent: {totalClasses - attendedClasses}</span>
                </div>
            </div>

            <div className='flex justify-start'>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(status)}`}>
                    {status}
                </span>
            </div>
        </div>
    )
}

export default SubjectCard