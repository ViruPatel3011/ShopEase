import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({ withCredentials: false });

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = false;

export default axiosInstance;