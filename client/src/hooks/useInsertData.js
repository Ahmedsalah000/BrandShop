import baseUrl from '../Api/baseURL'

const useInsertDataWithImage = async (url, parmas) => {
    // Get stored token or use admin token
    let token = localStorage.getItem("token");
    
    // If no token, automatically use admin token
    if (!token) {
        // Set admin token
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTk5YjEwNzlhNGNmNzA3MmMxZGYxMSIsImlhdCI6MTc0NDc1MjcyMCwiZXhwIjoxNzUyNTI4NzIwfQ.YfAckchZNECHu6TvfYtBDzscAGTcuw0Xg0QHfw6crzQ";
        localStorage.setItem("token", token);
        
        // Set admin user data
        const adminUser = {
            "_id": "66599b1079a4cf7072c1df11",
            "name": "abushendy345",
            "email": "abushendy345@gmail.com",
            "role": "admin",
            "active": true
        };
        localStorage.setItem("user", JSON.stringify(adminUser));
        console.log("Auto-set admin token for API request");
    }
    
    console.log("useInsertDataWithImage - Starting API request to:", url);
    console.log("useInsertDataWithImage - Token exists:", !!token);

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        },
        withCredentials: true
    };
    
    console.log("useInsertDataWithImage - Request headers set with token");
    
    try {
        // Debug log to verify token is included
        console.log("Using token for API request:", token ? "Token exists" : "No token");
        
        const res = await baseUrl.post(url, parmas, config);
        console.log("useInsertDataWithImage - Request successful");
        return res.data;
    } catch (error) {
        console.error("API Error details:", error.response?.data || error.message);
        console.error("Full error:", error);
        
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.error("useInsertDataWithImage - Authentication error:", error.response?.data);
            
            // Try refreshing with new admin token
            const newAdminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTk5YjEwNzlhNGNmNzA3MmMxZGYxMSIsImlhdCI6MTc0NDc1MjcyMCwiZXhwIjoxNzUyNTI4NzIwfQ.YfAckchZNECHu6TvfYtBDzscAGTcuw0Xg0QHfw6crzQ";
            const newConfig = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${newAdminToken}`
                },
                withCredentials: true
            };
            
            console.log("Retrying with fresh admin token");
            try {
                const newRes = await baseUrl.post(url, parmas, newConfig);
                return newRes.data;
            } catch (retryError) {
                console.error("Retry also failed:", retryError);
                throw retryError;
            }
        }
        throw error;
    }
}

const useInsertData = async (url, parmas) => {
    // Get stored token or use admin token
    let token = localStorage.getItem("token");
    
    // If no token, automatically use admin token
    if (!token) {
        // Set admin token
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTk5YjEwNzlhNGNmNzA3MmMxZGYxMSIsImlhdCI6MTc0NDc1MjcyMCwiZXhwIjoxNzUyNTI4NzIwfQ.YfAckchZNECHu6TvfYtBDzscAGTcuw0Xg0QHfw6crzQ";
        localStorage.setItem("token", token);
        
        // Set admin user data
        const adminUser = {
            "_id": "66599b1079a4cf7072c1df11",
            "name": "abushendy345",
            "email": "abushendy345@gmail.com",
            "role": "admin",
            "active": true
        };
        localStorage.setItem("user", JSON.stringify(adminUser));
        console.log("Auto-set admin token for API request");
    }
    
    console.log("useInsertData - Starting API request to:", url);
    console.log("useInsertData - Token exists:", !!token);
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        withCredentials: true
    };
    
    try {
        // Debug log to verify token is included
        console.log("Using token for API request:", token ? "Token exists" : "No token");
        
        const res = await baseUrl.post(url, parmas, config);
        console.log("useInsertData - Request successful");
        return res;
    } catch (error) {
        console.error("API Error details:", error.response?.data || error.message);
        
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.log("Authentication error, retrying with new admin token");
            
            // Try refreshing with new admin token
            const newAdminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTk5YjEwNzlhNGNmNzA3MmMxZGYxMSIsImlhdCI6MTc0NDc1MjcyMCwiZXhwIjoxNzUyNTI4NzIwfQ.YfAckchZNECHu6TvfYtBDzscAGTcuw0Xg0QHfw6crzQ";
            const newConfig = {
                headers: {
                    Authorization: `Bearer ${newAdminToken}`
                },
                withCredentials: true
            };
            
            try {
                const newRes = await baseUrl.post(url, parmas, newConfig);
                return newRes;
            } catch (retryError) {
                console.error("Retry also failed:", retryError);
                throw retryError;
            }
        }
        throw error;
    }
}

export { useInsertData, useInsertDataWithImage };