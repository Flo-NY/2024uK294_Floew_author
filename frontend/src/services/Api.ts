import axios from "axios";


const defaultInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

defaultInstance.interceptors.request.use(
  (config) => {
    let correctPath = config.url !== "login" && config.url !== "register";
    const token = sessionStorage.getItem("token");
    if (token && correctPath) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default defaultInstance;
