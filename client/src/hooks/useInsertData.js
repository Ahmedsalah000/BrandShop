import baseUrl from '../Api/baseURL'

const useInsertDataWithImage = async (url, parmas) => {
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
        const res = await baseUrl.post(url, parmas, config);
        return res.data;
    } catch (error) {
        if (error.response?.status === 403) {
            localStorage.removeItem("token"); // Clear invalid token
            throw new Error("Authentication failed. Please login again.");
        }
        throw error;
    }
}

const useInsertData = async (url, parmas) => {
    const token = localStorage.getItem("token");
    const config = token ? {
        headers: {
            Authorization: `Bearer ${token}`
        }
    } : {};
    
    try {
        const res = await baseUrl.post(url, parmas, config);
        return res;
    } catch (error) {
        if (error.response?.status === 403) {
            localStorage.removeItem("token");
        }
        throw error;
    }
}

export { useInsertData, useInsertDataWithImage };