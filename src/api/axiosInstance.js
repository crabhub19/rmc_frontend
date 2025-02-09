// api.js
import axios from 'axios';
const url = import.meta.env.VITE_API_URL;
// Create an Axios instance
const api = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor for attaching access tokens
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `JWT ${accessToken}`;
  }
  return config;
});

// Response Interceptor for handling expired tokens
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // Check if token has expired and if we haven't already retried
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest.url !== "jwt/refresh/" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken) {
          const response = await axios.post(`${url}/account/auth/jwt/refresh/`, {
            refresh: refreshToken,
          });

          const newAccessToken = response.data.access;

          // Store new access token in localStorage
          localStorage.setItem("access_token", newAccessToken);

          // Update Authorization header and retry the original request
          axios.defaults.headers.common["Authorization"] = `JWT ${newAccessToken}`;
          originalRequest.headers.Authorization = `JWT ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Handle refresh failure (e.g., redirect to login)
        console.error("Refresh token failed. Logging out...", refreshError);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_id");
        window.location.href = "/auth"; // Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export default api;