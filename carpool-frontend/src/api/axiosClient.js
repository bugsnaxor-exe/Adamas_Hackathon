import axios from "axios";

// Create a centralized Axios instance
const axiosClient = axios.create({
    // Use the environment variable for production, default to localhost for development
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * REQUEST INTERCEPTOR
 * Automatically attaches the JWT token from localStorage to the Authorization header.
 * This ensures all protected backend routes receive the required credentials.
 */
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

/**
 * RESPONSE INTERCEPTOR
 * Intercepts incoming responses to format the data and handle global errors.
 */
axiosClient.interceptors.response.use(
    (response) => {
        // Return just the response data so your API functions stay clean
        return response.data;
    },
    (error) => {
        const { response } = error;

        // Handle 401 Unauthorized globally (e.g., expired token or missing auth)
        if (response && response.status === 401) {
            console.warn(
                "Session expired or unauthorized. Redirecting to login.",
            );
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            // Force redirect to login page
            window.location.href = "/login";
        }

        // Reject with the backend's specific error message if available
        return Promise.reject(error.response?.data || error.message || error);
    },
);

export default axiosClient;
