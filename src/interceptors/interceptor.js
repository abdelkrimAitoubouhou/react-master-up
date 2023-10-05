import axios from 'axios'
import {API} from "../apis";

const axiosInstance = axios.create({
    baseURL: API
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Modify the request config here (e.g., add headers, authentication tokens)
        const accessToken = JSON.parse(localStorage.getItem("access_token"));

        // ** If token is present add it to request's Authorization Header
        if (accessToken && config.headers)
            config.headers.token = accessToken;

        return config;
    },
    (error) => {
        // Handle request errors here

        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Modify the response data here (e.g., parse, transform)

        return response;
    },
    (error) => {
        // Handle response errors here

        return Promise.reject(error);
    }
);

export default axiosInstance;
