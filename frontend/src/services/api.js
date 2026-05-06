import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const employerInfo = JSON.parse(localStorage.getItem('employerInfo'));
  
  if (employerInfo && employerInfo.token) {
    config.headers.Authorization = `Bearer ${employerInfo.token}`;
  } else if (adminInfo && adminInfo.token) {
    config.headers.Authorization = `Bearer ${adminInfo.token}`;
  } else if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
