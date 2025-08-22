import axios from "axios";

const API_URL = "http://localhost:3001";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Check if the failed request is NOT a login request
      const isLoginRequest = error.config?.url?.includes('/login');
      
      if (!isLoginRequest) {
        // Clear token and redirect to login only for non-login requests
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
        window.location.href = "/auth";
      }
      // For login requests, let the error bubble up to be handled by the component
    }
    return Promise.reject(error);
  }
);

export default api;
export { api };
