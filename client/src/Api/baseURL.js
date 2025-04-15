import axios from 'axios';

const baseUrl = axios.create({
  baseURL: 'https://brand-shop-omega.vercel.app',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Request Interceptor
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

// Response Interceptor
baseUrl.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      console.error('Response Data:', error.response.data);
      console.error('Response Status:', error.response.status);
      console.error('Response Headers:', error.response.headers);
      if (error.response.status === 401 || error.response.status === 403) {
        console.error('Unauthorized access - potentially redirect to login');
      }
    } else if (error.request) {
      console.error('Request Error:', error.request);
    } else {
      console.error('Error Message:', error.message);
    }
    return Promise.reject(error);
  }
);

export default baseUrl;

export const useGetData = async (url, params) => {
  // Ensure params are passed correctly for GET requests
  const config = params ? { params } : {};
  const res = await baseUrl.get(url, config);
  return res.data;
};

export const useInsertData = async (url, data) => {
  // POST typically sends data in the body
  const res = await baseUrl.post(url, data);
  return res; // Return the whole response object
};

export const useInsertDataWithImage = async (url, formData) => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };
  const res = await baseUrl.post(url, formData, config);
  console.log(res.status);
  return res;
};

export const useUpdateData = async (url, data) => {
  // PUT typically sends data in the body
  const res = await baseUrl.put(url, data);
  return res;
};

export const useUpdateDataWithImage = async (url, formData) => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };
  const res = await baseUrl.put(url, formData, config);
  return res;
};

// Cleanly rewritten useDeleteData
export const useDeleteData = async (url, params) => {
  try {
    // Construct the config object for DELETE request
    const config = {
        params: params // Pass the params object under the 'params' key
    };
    // Make the DELETE request
    const response = await baseUrl.delete(url, config);
    // Return the data from the response
    return response.data;
  } catch (error) {
    // Log and rethrow error if needed
    console.error('Error in useDeleteData:', error);
    throw error;
  }
};
