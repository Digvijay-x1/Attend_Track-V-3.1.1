import { create } from 'zustand';

import { axiosInstance } from '../lib/axios';


export const useCalculatorStore = create((set) => ({
    isLoading: false,
    courseList: [],
    calculatorResult: null,
    error: null,
    setCourseList: (courseList) => set({ courseList }),
    setIsLoading: (isLoading) => set({ isLoading }),
    fetchCourseList: async () => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get('/courses/get-courses');
            const courses = response.data?.courses || [];
            set({ courseList: courses });
        } catch (error) {
            console.error('Error fetching course list:', error);
            set({ courseList: [] });
        } finally {
            set({ isLoading: false });
        }
    },
    postDataFromCalculator: async (data) => {
        set({ isLoading: true, error: null });
      
        try {
          const response = await axiosInstance.post('/calculator/get-calculation', data);
      
          // Store the result in your Zustand state if needed
          set({ calculatorResult: response.data });
      
          // Optional: toast or log for feedback
          console.log("Calculation result:", response.data);
        } catch (error) {
          console.error('Error posting data from calculator:', error);
          set({ error: error.message });
        } finally {
          set({ isLoading: false });
        }
      }
}))