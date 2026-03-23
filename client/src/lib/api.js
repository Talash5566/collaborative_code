import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ,
  withCredentials: true,  // Critical — sends your auth cookie automatically
});

export default api;