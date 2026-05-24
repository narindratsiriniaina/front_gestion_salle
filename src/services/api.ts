import axios from 'axios';

// Raha mbola tsy mandeha ny http://localhost:56842/api dia andramo ity https://localhost:44335/api ity
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:44335/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to inject user context headers dynamically on each request
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user && user.id) {
            config.headers['X-User-Id'] = user.id.toString();
          }
          if (user && user.role) {
            config.headers['X-User-Role'] = user.role;
          }
        } catch (e) {
          console.error("Error parsing user from localStorage in api interceptor", e);
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
