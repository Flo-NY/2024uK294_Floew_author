import axios from "axios";
import { getToken } from "./UserService";

const defaultInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL || "http://localhost:3000",
});

defaultInstance.interceptors.request.use(
  (config) => {
    let correctPath = config.url !== "login" && config.url !== "register";
    const token = getToken();
    if (token && correctPath) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default defaultInstance;
