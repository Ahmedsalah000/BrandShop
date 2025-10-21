import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminTokenSetter = () => {
    const [showModal, setShowModal] = React.useState(false);
    const navigate = useNavigate();

    const handleSetAdminToken = () => {
        // Set admin token
        const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTk5YjEwNzlhNGNmNzA3MmMxZGYxMSIsImlhdCI6MTc0NDc1MjcyMCwiZXhwIjoxNzUyNTI4NzIwfQ.YfAckchZNECHu6TvfYtBDzscAGTcuw0Xg0QHfw6crzQ";
        localStorage.setItem("token", adminToken);
        
        // Set admin user data
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
        
        setShowModal(false);
        
        // Navigate to admin brand page
        setTimeout(() => {
            navigate('/admin/addbrand');
            window.location.reload(); // Force reload to ensure token takes effect
        }, 500);
    };

    // Float the button in the corner of the screen
    return (
        <>
            <Button 
                variant="dark" 
                size="sm" 
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 1000,
                    opacity: 0.7
                }}
                onClick={() => setShowModal(true)}
            >
                Admin Login
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Admin Login Override</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This will set your browser to use the admin token without requiring login.</p>
                    <p className="text-danger">This is for development testing only.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSetAdminToken}>
                        Set Admin Token
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AdminTokenSetter; 