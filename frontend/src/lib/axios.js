import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3333/api",
    withCredentials: true,
});

