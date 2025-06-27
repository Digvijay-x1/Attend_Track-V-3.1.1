import { create } from "zustand";

import { axiosInstance } from "../lib/axios";


export const useSubjectStore = create((set)=>({
    subjects: [],
    isLoading: false,
    error: null,
    data: null,
    fetchSubjectsData: async()=>{
        set({isLoading: true});
        try {
            const res = await axiosInstance.get("/subjects/get-subjects");
            set({data: res.data});
        } catch (error) {
            console.log(`Error in fetchSubjectsData: ${error.message}`);
            set({error: error.message});
        } finally {
            set({isLoading: false});
        }
    },
    fetchSubjects: async()=>{
        set({isLoading: true});
        try {
            const res = await axiosInstance.get("/dashboard/get-dashboard-data");
            set({subjects: res.data.coursesWithAttendancePercentage});
        } catch (error) {
            console.log(`Error in fetchSubjects: ${error.message}`);
            set({error: error.message});
        } finally {
            set({isLoading: false});
        }
    },
    deleteSubject: async(id)=>{
        set({isLoading: true});
        try {
            await axiosInstance.delete(`/courses/delete-course/${id}`);
        } catch (error) {
            console.log(`Error in deleteSubject: ${error.message}`);
            set({error: error.message});
        } finally {
            set({isLoading: false});
        }
    },
    createSubject: async(data)=>{
        set({isLoading: true});
        try {
            await axiosInstance.post("/courses/create-course", data);
        } catch (error) {
            console.log(`Error in createSubject: ${error.message}`);
            set({error: error.message});
        } finally {
            set({isLoading: false});
        }
    },
    editSubject: async(id, data)=>{
        set({isLoading: true});
        try {
            await axiosInstance.put(`/courses/update-course/${id}`, data);
        } catch (error) {
            console.log(`Error in editSubject: ${error.message}`);
            set({error: error.message});
        } finally {
            set({isLoading: false});
        }
    }   
}))