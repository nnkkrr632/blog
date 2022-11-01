import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_MICROCMS_API_ENDPOINT,
  timeout: 3000,
  headers: {
    'X-MICROCMS-API-KEY': import.meta.env.VITE_MICROCMS_API_KEY,

    'Content-Type': 'application/json',
  },
});

export default axiosClient;
