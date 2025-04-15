import axios from 'axios'

const baseUrl = axios.create({
  baseURL: 'https://brand-shop-omega.vercel.app',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    // Remove CORS headers from client-side configuration
  },
  withCredentials: true
});

// Add request interceptor to include token in headers
baseUrl.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = \`Bearer ${token}\`;
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

export const useInsertData = async (url, parmas) => {
    try {
      const res = await baseUrl.post(url, parmas);
      return res; // Return the whole response object
    } catch (error) {
      // Rethrow the error to be caught by component-level error handlers
      // or the global interceptor if not caught locally
      throw error; 
    }
};


export const useInsertDataWithImage = async (url, parmas) => {
    const config = {
        headers: { "Content-Type": "multipart/form-data" }
    }
    const res = await baseUrl.post(url, parmas, config);
    console.log(res.status)
    return res;
}


export const useInsUpdateData = async (url, parmas) => {
    const config = {
        headers: { "Content-Type": "application/json" }
    }
    const res = await baseUrl.put(url, parmas, config);
    return res;
}
export const useUpdateDataWithImage = async (url, parmas) => {
    const config = {
        headers: { "Content-Type": "multipart/form-data" }
    }
    const res = await baseUrl.put(url, parmas, config);
    return res;
}


export const useDeleteData = async (url, parmas) => {
    const res = await baseUrl.delete(url, parmas);
    return res.data;
};
