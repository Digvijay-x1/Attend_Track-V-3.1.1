import { create } from "zustand";
import {axiosInstance} from '../lib/axios.js'
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isRegistering: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    checkAuth: async ()=>{
        set({isCheckingAuth: true});
        try {
            const res = await axiosInstance.get("/auth/check-auth");
            set({authUser: res.data});
        } catch (error) {
            console.log("error in checkAuth: ",error);
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    },
    register: async (formData)=>{
        set({isRegistering: true});
        try {
            const res = await axiosInstance.post("/auth/signup",formData);
            set({authUser: res.data});
            toast.success("Account created successfully");
            
        } catch (error) {
            toast.error("Failed to create account");
            console.log("error in register: ",error);
        } finally {
            set({isRegistering: false});
        }
    },
    logout: async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged out successfully");
            // Redirect will happen automatically due to the protected routes in App.jsx
        } catch (error) {
            // Even if the API call fails, we should still log the user out locally
            set({authUser: null});
            console.log("error in logout: ", error);
            toast.error("Error during logout, but you've been logged out locally");
        }
    },
    login: async(formData)=>{
        set({isLoggingIn: true});
        try {
            const res = await axiosInstance.post("/auth/login",formData);
            set({authUser: res.data});
            toast.success("login successfully");
        } catch (error) {
            toast.error("password or email is incorrect");
            console.log("error in login: ",error);
        } finally {
            set({isLoggingIn: false});
        }
    },
    updateProfile: async(formData)=>{
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("/auth/update-profile",formData);
            set({authUser: res.data});
        } catch (error) {   
            toast.error("Failed to update profile");
            console.log("error in updateProfile: ",error);
        } finally {
            set({isUpdatingProfile: false});
        }
    }
}))