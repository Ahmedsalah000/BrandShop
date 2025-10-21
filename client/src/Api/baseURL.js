import axios from 'axios'

const baseUrl = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://brand-shop-omega.vercel.app',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

// Add request interceptor to include token in headers
baseUrl.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
baseUrl.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
    } else if (error.code === 'ERR_NETWORK') {
      console.error('Network error: Unable to connect to the server');
    }
    return Promise.reject(error);
  }
);

export default baseUrl