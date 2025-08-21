import axios from "axios";

const BASE_URL = "https://gigastar-backend.vercel.app/api";
// const BASE_URL = 'http://localhost:5000/api';
const http = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
      },
});

http.interceptors.request.use((config) => { 
    const { intercept = true } = config;
    if (!intercept) return config;
    const token = localStorage.getItem("gigastarToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});


export default http;