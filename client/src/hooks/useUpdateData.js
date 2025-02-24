import baseUrl from '../Api/baseURL'

const useInUpdateDataWithImage = async (url, parmas) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Authentication required. Please login first.");
    }

    const config = {
        headers: { 
            "Content-Type": "multipart/form-data", 
            Authorization: `Bearer ${token}` 
        }
    }
    try {
        const res = await baseUrl.put(url, parmas, config);
        return res;
    } catch (error) {
        if (error.response?.status === 403) {
            localStorage.removeItem("token");
            throw new Error("Authentication failed. Please login again.");
        }
        if (error.code === 'ERR_NETWORK') {
            throw new Error('Unable to connect to the server. Please check your internet connection.');
        }
        throw error;
    }
}

const useInsUpdateData = async (url, parmas) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Authentication required. Please login first.");
    }

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    try {
        const res = await baseUrl.put(url, parmas, config);
        return res;
    } catch (error) {
        if (error.response?.status === 403) {
            localStorage.removeItem("token");
            throw new Error("Authentication failed. Please login again.");
        }
        if (error.code === 'ERR_NETWORK') {
            throw new Error('Unable to connect to the server. Please check your internet connection.');
        }
        throw error;
    }
}

export { useInUpdateDataWithImage, useInsUpdateData };