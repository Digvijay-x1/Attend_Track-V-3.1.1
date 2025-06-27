import React, { useEffect } from 'react'
import { Check, Clock, Calendar, TrendingUp } from 'lucide-react'
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
      <div className="min-h-screen bg-base-200 p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <SkeletonCard cards={5} />
        </div>
      </div>
    )
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8">
        {/* Enhanced Header with better mobile layout */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2.5 rounded-xl">
                <Calendar className="h-6 w-6 md:h-7 md:w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-base-content">
                  Attendance Input
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-base-content/70 mt-1">
                  Record your class attendance quickly and easily
                </p>
              </div>
            </div>
            
            {/* Optional: Add current date display */}
            <div className="hidden sm:flex items-center gap-2 bg-base-100 px-3 py-2 rounded-lg shadow-sm">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-base-content">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 md:gap-6">
          {/* Today's Schedule Section - Enhanced */}
          <div className="xl:col-span-3">
            <div className="card bg-base-100 shadow-xl border border-base-300/50 hover:shadow-2xl transition-shadow duration-300">
              <div className="card-body p-4 sm:p-5 md:p-6">
                {/* Enhanced Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2.5 rounded-xl border border-primary/20">
                      <Clock className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-base-content">
                        Today's Schedule
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-base-content/70 mt-1">
                        Mark your attendance for today's classes
                      </p>
                    </div>
                  </div>
                  
                  {/* Info Badge */}
                  <div className="flex items-center gap-2 bg-info/10 px-3 py-1.5 rounded-full border border-info/20">
                    <TrendingUp className="h-3 w-3 text-info" />
                    <span className="text-xs font-medium text-info">
                      value*present 
                    </span>
                  </div>
                </div>

                {/* Schedule Content */}
                <div className="bg-base-200/50 rounded-xl p-3 sm:p-4">
                  <TodaySchedule todaySchedule={todaySchedule} />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Attendance Section - Enhanced */}
          <div className="xl:col-span-1">
            <div className="card bg-base-100 shadow-xl border border-base-300/50 hover:shadow-2xl transition-shadow duration-300 h-fit">
              <div className="card-body p-4 sm:p-5 md:p-6">
                {isRecentAttendanceLoading ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="skeleton w-10 h-10 rounded-xl"></div>
                      <div className="space-y-2 flex-1">
                        <div className="skeleton h-4 w-3/4"></div>
                        <div className="skeleton h-3 w-1/2"></div>
                      </div>
                    </div>
                    <SkeletonCard cards={3} />
                  </div>
                ) : (
                  <>
                    {/* Enhanced Header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="bg-secondary/10 p-2.5 rounded-xl border border-secondary/20">
                        <Check className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-base-content">
                          Recent Activity
                        </h3>
                        <p className="text-xs sm:text-sm text-base-content/70 mt-1">
                          Your latest attendance
                        </p>
                      </div>
                    </div>

                    {/* Recent Content */}
                    <div className="bg-base-200/50 rounded-xl p-3 sm:p-4">
                      <RecentAtt recentAttendance={recentAttendance} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Optional: Add footer info for mobile */}
        <div className="mt-8 sm:hidden">
          <div className="card bg-base-100/50 shadow-sm border border-base-300/30">
            <div className="card-body p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-base-content/60">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric',
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AttendancePage