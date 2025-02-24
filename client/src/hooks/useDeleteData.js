import baseUrl from '../Api/baseURL'

const useDeleteData = async (url, parmas) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Authentication required. Please login first.");
    }

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    try {
        const res = await baseUrl.delete(url, config, parmas);
        return res.data;
    } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem('token');
            throw new Error('Authentication failed. Please login again.');
        }
        if (error.code === 'ERR_NETWORK') {
            throw new Error('Unable to connect to the server. Please check your internet connection.');
        }
        throw error;
    }
}

export default useDeleteData;
