import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://folkvizag-882278565284.europe-west1.run.app",
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("hky_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
