import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://nnkkrr632.microcms.io/api/v1/',
  timeout: 3000,
  headers: {
    'X-MICROCMS-API-KEY': import.meta.env.VITE_API_KEY,

    'Content-Type': 'application/json',
  },
});

export default axiosClient;
