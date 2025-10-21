// Add this script to set admin token directly
function setAdminToken() {
    // Admin token
    const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTk5YjEwNzlhNGNmNzA3MmMxZGYxMSIsImlhdCI6MTc0NDc1MjcyMCwiZXhwIjoxNzUyNTI4NzIwfQ.YfAckchZNECHu6TvfYtBDzscAGTcuw0Xg0QHfw6crzQ";
    localStorage.setItem("token", adminToken);
    
    // Admin user data
    const adminUser = {
        "_id": "66599b1079a4cf7072c1df11",
        "name": "abushendy345",
        "email": "abushendy345@gmail.com",
        "role": "admin",
        "active": true
    };
    localStorage.setItem("user", JSON.stringify(adminUser));
    
    console.log("Admin token set:", !!localStorage.getItem("token"));
    console.log("Admin user data set:", !!localStorage.getItem("user"));
    
    alert("Admin token set successfully!");
    
    // Redirect to admin page
    window.location.href = "/admin/addbrand";
}

// Execute immediately
setAdminToken(); 