import { create } from "zustand";
import { axiosInstance } from "../lib/axios";


export const useDashStore = create((set)=>({
    isLoading: false,
    isError: false,
    error: null,
    data: null,
    fetchData: async()=>{
        set({isLoading: true});
        try{
            const res = await axiosInstance.get("/dashboard/get-dashboard-data");
            set({data: res.data});
        }catch(error){
            set({isError: true, error: error.message});
        }finally{
            set({isLoading: false});
        }
    }
}))