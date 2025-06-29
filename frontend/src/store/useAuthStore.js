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
    googleLogin: async(userData)=>{
        set({isLoggingIn: true});
        try {
            const res = await axiosInstance.post("/auth/google-login", userData);
            set({authUser: res.data});
            toast.success("Logged in with Google successfully");
        } catch (error) {
            toast.error("Failed to login with Google");
            console.log("error in googleLogin: ", error);
        } finally {
            set({isLoggingIn: false});
        }
    },
    updateProfile: async(formData)=>{
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("/auth/update-profile", formData);
            
            // Check if response has the expected structure
            if (res.data && res.data.user) {
                // Update the authUser state with the updated user data
                // Preserve the existing structure by updating only the user part
                set((state) => {
                    // If authUser has a nested user property
                    if (state.authUser && state.authUser.user) {
                        return {
                            authUser: {
                                ...state.authUser,
                                user: res.data.user
                            }
                        };
                    }
                    // If authUser is the user object directly
                    else {
                        return { authUser: res.data };
                    }
                });
                
                toast.success("Profile updated successfully");
            } else {
                console.error("Unexpected response format:", res.data);
                toast.error("Received unexpected response format");
            }
        } catch (error) {   
            console.error("Error in updateProfile:", error.response?.data || error.message);
            
            // Show more specific error message if available
            const errorMessage = error.response?.data?.message || 
                                error.response?.data?.error || 
                                "Failed to update profile";
            toast.error(errorMessage);
        } finally {
            set({isUpdatingProfile: false});
        }
    }
}))