import React, { useEffect } from 'react'
import { Check, Clock, Calendar } from 'lucide-react'
import { useInputStore } from '../store/useInput.store'
import SkeletonCard from '../components/skeleton/SkeletonCard.jsx'
import { toast } from 'react-hot-toast'
import TodaySchedule from '../components/cards/TodaySchedule.jsx'
import RecentAtt from '../components/cards/RecentAtt.jsx'

const AttendancePage = () => {
  const { 
    todaySchedule, 
    fetchTodaySchedule, 
    isLoading, 
    error, 
    recentAttendance, 
    fetchRecentAttendance, 
    isRecentAttendanceLoading 
  } = useInputStore();

  useEffect(() => {
    fetchTodaySchedule();
    fetchRecentAttendance();
  }, [fetchTodaySchedule, fetchRecentAttendance]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 p-2 sm:p-4">
        <div className="max-w-6xl mx-auto">
          <SkeletonCard cards={3} />
        </div>
      </div>
    )
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-6xl mx-auto px-2 py-3 sm:px-4 sm:py-6">
        {/* Simple Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-lg">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-base-content">
                Attendance Input
              </h1>
              <p className="text-xs sm:text-sm text-base-content/70">
                Record your class attendance
              </p>
            </div>
          </div>
        </div>

        {/* Simplified Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-6">
          {/* Today's Schedule Section */}
          <div className="lg:col-span-3">
            <div className="card bg-base-100 shadow-md">
              <div className="card-body p-3 sm:p-4">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-base-content">
                      Today's Schedule
                    </h3>
                    <p className="text-xs text-base-content/70">
                      Mark your attendance (*value = attendance points)
                    </p>
                  </div>
                </div>

                {/* Schedule Content */}
                <div>
                  <TodaySchedule todaySchedule={todaySchedule} />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Attendance Section */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-md h-fit">
              <div className="card-body p-3 sm:p-4">
                {isRecentAttendanceLoading ? (
                  <SkeletonCard cards={3} />
                ) : (
                  <>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-secondary/10 p-2 rounded-lg">
                        <Check className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-base-content">
                          Recent Activity
                        </h3>
                        <p className="text-xs text-base-content/70">
                          Your latest attendance
                        </p>
                      </div>
                    </div>

                    {/* Recent Content */}
                    <div>
                      <RecentAtt recentAttendance={recentAttendance} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Simple date display for mobile */}
        <div className="mt-6 sm:hidden text-center">
          <p className="text-sm text-base-content/60">
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AttendancePage