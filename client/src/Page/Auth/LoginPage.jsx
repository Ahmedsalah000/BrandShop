import React from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoginHook from './../../hook/auth/login-hook';
import { ToastContainer } from 'react-toastify';

const LoginPage = () => {
    const [email, password, loading, onChangeEmail, onChangePassword, onSubmit, isPress] = LoginHook();

    // Function to set admin token directly (for testing)
    const setAdminToken = () => {
        // Set the admin token that we know works
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
        
        console.log("Admin token set successfully:", !!localStorage.getItem("token"));
        console.log("Admin user data set successfully:", !!localStorage.getItem("user"));
        
        // Redirect to admin page
        window.location.href = "/admin/addbrand";
    };

    return (
        <Container style={{ minHeight: "690px" }}>
            <Row className="py-5 d-flex justify-content-center ">
                <Col sm="12" className="d-flex flex-column ">
                    <label className="mx-auto title-login">تسجيل الدخول</label>
                    <input
                        value={email}
                        onChange={onChangeEmail}
                        placeholder="الايميل..."
                        type="email"
                        className="user-input my-3 text-center mx-auto"
                    />
                    <input
                        value={password}
                        onChange={onChangePassword}
                        placeholder="كلمه السر..."
                        type="password"
                        className="user-input text-center mx-auto"
                    />
                    <button onClick={onSubmit} className="btn-login mx-auto mt-4">تسجيل الدخول</button>
                    <label className="mx-auto my-4">
                        ليس لديك حساب ؟{" "}
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                            <span style={{ cursor: "pointer" }} className="text-danger">
                                اضغط هنا
                            </span>
                        </Link>
                    </label>


                    <label className="mx-auto my-4">

                        <Link to="/user/forget-password" style={{ textDecoration: 'none', color: 'red' }}>
                           ؟ هل نسيت كلمه السر
                        </Link>
                    </label>

                    {/* Admin Direct Login Button */}
                    <div className="mx-auto my-4 p-3 border rounded bg-light">
                        <h6 className="text-center mb-3">للمسؤول فقط</h6>
                        <button 
                            onClick={setAdminToken} 
                            className="btn btn-dark mx-auto d-block"
                        >
                            تسجيل دخول كمسؤول مباشرة
                        </button>
                        <p className="text-muted text-center mt-2 small">يستخدم فقط للاختبار</p>
                    </div>

                    {isPress === true ? (loading === true ? (<Spinner animation="border" role="status">

                    </Spinner>) : null) : null}


                </Col>



            </Row>
            <ToastContainer />
        </Container>
    )
}

export default LoginPage
