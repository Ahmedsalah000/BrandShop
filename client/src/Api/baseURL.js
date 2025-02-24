import axios from 'axios'

const baseUrl = axios.create({
  baseURL: 'https://brand-shop-omega.vercel.app',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
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