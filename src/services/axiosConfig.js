import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "vue3-toastify";

// Create an instance of Axios with custom configuration
const BASE_URL = "http://localhost:8000/api"; // Update with your API base URL
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Set the base URL for API requests
});

// Add an interceptor for request configuration
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any headers or request modifications here
    // For example, adding an Authorization header with a token
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add an interceptor for response handling
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors and display appropriate messages
    if (error.response) {
      // The request was made and the server responded with an error status code
      toast.error(error.response.data.message, {
        autoClose: 1000,
      }); // ToastOptions
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      toast.error(error.message, {
        autoClose: 1000,
      }); // ToastOptions
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
