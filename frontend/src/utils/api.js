import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : "https://ashope-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    "x-api-key":  import.meta.env.VITE_PUBLIC_API_KEY, // ✅ Secure this value in .env or via environment variable in production
    
  },
  withCredentials: true,

 
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const { data } = await api.post("/refresh-token", { refreshToken });
          localStorage.setItem("token", data.token);
          error.config.headers["Authorization"] = `Bearer ${data.token}`;
          return api(error.config); 
        } catch (refreshError) {
          console.error("Token refresh failed", refreshError);
        }
      }
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default api;
