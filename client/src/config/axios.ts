import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://talrn-task-ashy.vercel.app",
    // baseURL: "http://localhost:8080",
    withCredentials: true
})