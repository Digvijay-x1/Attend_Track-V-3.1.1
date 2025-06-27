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
    <div className="p-6 min-h-screen bg-base-200">
      <h1 className="text-3xl font-bold text-base-content mb-6">Dashboard</h1>
      
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Overall Attendance */}
        <div className="bg-base-100 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                 <h3 className="text-sm text-base-content/70 font-medium">Overall Attendance</h3>
              <div className="text-3xl font-bold text-base-content/85 mb-2">{(attendanceStats?.totalclassesAttended / attendanceStats?.totalclasses * 100 || 0).toFixed(1)}%</div>
              </div>
             
              
            
             <div className="bg-blue-200/20 p-2 rounded-lg">
                <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              
              </div>
              </div>
            
            <div className="text-green-600 text-sm font-medium">+2.1% from last week</div>
          </div>

        {/* Total Classes */}
        <div className="bg-base-100  rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm text-base-content/70 font-medium">Total Classes</h3>
              <div className="text-3xl font-bold text-base-content/85 mb-2">{attendanceStats?.totalclasses || 0}</div>
            </div>
            <div className="bg-base-200 border border-white/10 p-2 rounded-lg">
                <svg className="w-7 h-7 text-base-content/85" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
          </div>
          <div className="text-primary text-sm font-medium">
            {attendanceStats?.totalclassesAttended || 0} attended
          </div>
        </div>

        {/* Below 75% */}
        <div className="bg-base-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm text-base-content/70 font-medium">Below 75%</h3>
              <div className="text-3xl font-bold text-error mb-2">{totalLowAttendanceCourses || 0}</div>
            </div>
            <div className="bg-error/20 p-2 rounded-lg">
              <svg className="w-7 h-7 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          <div className="text-error text-sm font-medium">Needs attention</div>
        </div>

        {/* This Week */}
        <div className="bg-base-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm text-base-content/70 font-medium">This Week</h3>
              <div className="text-3xl font-bold text-success mb-2">{attendancePerWeek?.totalClassesAttended}/{attendancePerWeek?.totalClasses}</div>
            </div>
            <div className="bg-success/20 p-2 rounded-lg">
              <svg className="w-7 h-7 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="text-success text-sm font-medium">
            {(attendancePerWeek?.totalClassesAttended / attendancePerWeek?.totalClasses * 100 || 0).toFixed(1)}% attendance
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly Attendance Chart */}
        <div className="hidden sm:block bg-base-100 rounded-xl p-6 shadow-sm">
  <h3 className="text-sm text-base-content/70 font-medium mb-4">Weekly Attendance</h3>
  <WeeklyAttendanceChart stats={stats} />
</div>

        {/* Subject Attendance Chart */}
        <div className="bg-base-100 rounded-xl p-6 shadow-sm">
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
      </div>
    </div>
  );
}

export default Dashboard