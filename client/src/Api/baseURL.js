import axios from 'axios'

const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const baseUrl = axios.create({
  baseURL: isDev ? 'http://localhost:8000' : 'https://brand-shop-omega.vercel.app',
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
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for handling errors globally (optional but good practice)
baseUrl.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response Data:', error.response.data);
      console.error('Response Status:', error.response.status);
      console.error('Response Headers:', error.response.headers);
      if (error.response.status === 401 || error.response.status === 403) {
        // Handle unauthorized errors, e.g., redirect to login
        console.error('Unauthorized access - potentially redirect to login');
        // localStorage.removeItem('token'); // Example: clear token
        // window.location.href = '/login'; // Example: redirect
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request Error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error Message:', error.message);
    }

    // Propagate the error so component-level error handling can also catch it
    return Promise.reject(error);
  }
);


export default baseUrl;

export const useGetData = async (url, params) => {
  const res = await baseUrl.get(url, params);
  return res.data;
};

export const useInsertData = async (url, params) => {
  const res = await baseUrl.post(url, params);
  return res; // Return the whole response object
};


export const useInsertDataWithImage = async (url, params) => {
    const config = {
        headers: { "Content-Type": "multipart/form-data" }
    }
    const res = await baseUrl.post(url, params, config);
    console.log(res.status)
    return res;
}


export const useInsUpdateData = async (url, params) => {
    const config = {
        headers: { "Content-Type": "application/json" }
    }
    const res = await baseUrl.put(url, params, config);
    return res;
}
export const useUpdateDataWithImage = async (url, params) => {
    const config = {
        headers: { "Content-Type": "multipart/form-data" }
    }
    const res = await baseUrl.put(url, params, config);
    return res;
}


export const useDeleteData = async (url, params) => {
    const res = await baseUrl.delete(url, params);
    return res.data;
};
