import React, { useState, useEffect } from 'react'
import notify from './../useNotifaction';
import { useDispatch, useSelector } from 'react-redux';
import { createNewUser, loginUser } from '../../redux/actions/authAction';
import { useNavigate } from 'react-router-dom'

const LoginHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(true)
    const [isPress, setIsPress] = useState(false)
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onSubmit = async () => {
        if (!email || !password) {
            notify("Please enter both email and password", "error");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            notify("Please enter a valid email address", "error");
            return;
        }
        if (password.length < 6) {
            notify("Password must be at least 6 characters long", "error");
            return;
        }
        setIsPress(true)
        setLoading(true)
        try {
            // Clear any existing tokens before login attempt
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            
            await dispatch(loginUser({
                email,
                password
            }));
        } catch (error) {
            console.error('Login error:', error);
            notify(error.response?.data?.message || "Authentication failed. Please check your credentials.", "error");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        } finally {
            setLoading(false)
            setIsPress(false)
        }
    }
    const res = useSelector(state => state.authReducer.loginUser)
    useEffect(() => {
        if (loading === false) {
            if (res) {
                if (res.error) {
                    notify(res.error, "error");
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                } else if (res.data && res.data.token) {
                    // Store token with proper error handling
                    try {
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("user", JSON.stringify(res.data.data));
                        
                        // Verify token was stored correctly
                        const storedToken = localStorage.getItem("token");
                        console.log("Token stored successfully:", !!storedToken);
                        
                        notify("تم تسجيل الدخول بنجاح", "success");
                        setTimeout(() => {
                            window.location.href = "/";
                        }, 1500);
                    } catch (e) {
                        console.error("Error storing token:", e);
                        notify("حدث خطأ في حفظ بيانات تسجيل الدخول", "error");
                    }
                } else {
                    notify("حدث خطأ في تسجيل الدخول", "error");
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
            }
        }
    }, [loading, res])

    return [email, password, loading, onChangeEmail, onChangePassword, onSubmit]
}

export default LoginHook