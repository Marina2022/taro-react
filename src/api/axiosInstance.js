import axios from "axios";

axios.defaults.baseURL = 'https://my.aspectum.app/'


const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'https://my.aspectum.app/',
  headers: {
    'Content-Type': 'application/json',
  }
});


axiosInstance.defaults.withCredentials = true

export default axiosInstance;
