import { create } from "zustand";

import {axiosInstance} from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useInputStore = create((set, get) => ({
  isLoading: false,
  error: null,
  todaySchedule: [],
  recentAttendance: [],
  attendanceStatus: {},
  isRecentAttendanceLoading: false,
  // fetch today schedule
  fetchTodaySchedule: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/input/today-schedule");
      const currentDay = new Date().getDay(); // 0 = Sun, 5 = Fri, etc.

      const filteredSchedule = [];

      response.data.coursesToday.forEach(course => {
        course.schedule.forEach(entry => {
          if (entry.dayOfWeek === currentDay) {
            filteredSchedule.push({
              _id: course._id,
              title: course.title,
              profName: course.profName,
              startTime: entry.startTime,
              endTime: entry.endTime
            });
          }
        });
      });

      set({ todaySchedule: filteredSchedule });
    } catch (error) {
      console.log(`Error in todaySchedule: ${error.message}`);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // fetch recent attendance
  fetchRecentAttendance: async () => {
    set({ isRecentAttendanceLoading: true, error: null });
    try {
        const response = await axiosInstance.get("/input/recent-attendance");
        set({ recentAttendance: response.data });
    } catch (error) {
        console.log(`Error in fetchRecentAttendance: ${error.message}`);
        set({ error: error.message });
    } finally {
        set({ isRecentAttendanceLoading: false });
    }
  },

  // mark attendance
  markAttendance: async (classId, status , attendanceValue) => {
    set({ isLoading: true, error: null });
    try {
        await axiosInstance.post(`/attendances/mark-attendance/${classId}`, { status , attendanceValue });
        toast.success("Attendance marked successfully");
        set({ attendanceStatus: { ...get().attendanceStatus, [classId]: status } });
    } catch (error) {
        console.log(`Error in markAttendance: ${error.message}`);
        toast.error("Failed to mark attendance");
        set({ error: error.message });
    } finally {
        set({ isLoading: false });
    }
    
  },

  resetAttendanceStatus: () => {
    set(() => ({
      attendanceStatus: {}
    }));
  }

}));

