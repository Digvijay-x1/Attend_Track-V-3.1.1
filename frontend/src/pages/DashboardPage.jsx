import React, { useEffect } from 'react'
import { useDashStore } from '../store/useDash.store'
import WeeklyAttendanceChart from '../components/chats/WeeklyAttendanceChart'
import SubjectAttendanceChart from '../components/chats/SubjectAttendanceChart'

const Dashboard = () => {
  const { fetchData , data} = useDashStore();
  const {totalLowAttendanceCourses , attendanceStats , attendancePerWeek , coursesWithAttendancePercentage , stats} = data || {};

  useEffect(()=>{
    fetchData();
  },[fetchData]);

  return (
    <div>
      <h1>Dashboard</h1>
  
      {/* Overall Attendance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm text-gray-600 font-medium">Overall Attendance</h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {(attendanceStats?.totalclassesAttended / attendanceStats?.totalclasses * 100 || 0).toFixed(1)}%
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-600 font-medium">
              <span className="text-green-600">+12.5%</span>
              <span className="text-gray-500"> from last month</span>
            </div>
          </div>
        </div>
      </div>
  
      {/* Total Classes */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm text-gray-600 font-medium">Total Classes</h3>
            <div className="text-3xl font-bold text-gray-900 mb-2">{attendanceStats?.totalclasses || 0}</div>
          </div>
          <div className="bg-gray-100 p-2 rounded-lg">
            <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13..." />
            </svg>
          </div>
        </div>
        <div className="text-blue-600 text-sm font-medium">
          {attendanceStats?.totalclassesAttended || 0} attended
        </div>
      </div>
       {/* Below 75% */}
       <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm text-gray-600 font-medium">Below 75%</h3>
              <div className="text-3xl font-bold text-red-600 mb-2">{totalLowAttendanceCourses || 0}
              </div>
              </div>
              
              <div className="bg-red-100 p-2 rounded-lg">
                <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            
            <div className=" text-red-600 text-sm font-medium">Needs attention</div>
          </div>

          {/* This Week */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                 <h3 className="text-sm text-gray-600 font-medium">This Week</h3>
              <div className="text-3xl font-bold text-green-600 mb-2">{attendancePerWeek?.totalClassesAttended}/{attendancePerWeek?.totalClasses}</div>
              </div>
             
              <div className="bg-green-100 p-2 rounded-lg">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <div className="text-green-600 text-sm font-medium">{(attendancePerWeek?.totalClassesAttended / attendancePerWeek?.totalClasses * 100 || 0).toFixed(1)}% attendance</div>
          </div>
          {/* Courses with attendance percentage */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm text-gray-600 font-medium">Courses with attendance percentage</h3>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {coursesWithAttendancePercentage?.map((course) => (
                <div key={course._id}>{course.title} - {course.attendancePercentage}%</div>
              )) || 'Loading courses...'}
            </div>
          </div>

          {/* Weekly Attendance */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm text-gray-600 font-medium">Weekly Attendance</h3>
            <WeeklyAttendanceChart stats={stats} />
          </div>
          {/* Subject Attendance */}
          <SubjectAttendanceChart
  title="Subject-wise Attendance"
  subjects={
    Array.isArray(coursesWithAttendancePercentage)
      ? coursesWithAttendancePercentage.map(course => ({
          name: course.title,
          percentage: course.attendancePercentage.toFixed(1)
        }))
      : []
  }
/>
    </div>
  );
}

export default Dashboard