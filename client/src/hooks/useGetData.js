import baseUrl from '../Api/baseURL'
import { useEffect } from 'react';

// Custom hook for GET requests
const useGetData = async (url, parmas) => {
    try {
        const res = await baseUrl.get(url, parmas);
        return res.data;
    } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem('token');
            throw new Error('Authentication failed. Please login again.');
        }
        if (error.code === 'ERR_NETWORK') {
            console.error('Network error: Unable to connect to the server');
            throw new Error('Unable to connect to the server. Please check your internet connection.');
        }
        throw error;
    }
}

// Custom hook for GET requests with token
const useGetDataToken = async (url, parmas) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Authentication required. Please login first.');
    }

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    try {
        const res = await baseUrl.get(url, config);
        return res.data;
    } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem('token');
            throw new Error('Authentication failed. Please login again.');
        }
        if (error.code === 'ERR_NETWORK') {
            console.error('Network error: Unable to connect to the server');
            throw new Error('Unable to connect to the server. Please check your internet connection.');
        }
        throw error;
    }
}

export { useGetData, useGetDataToken };