import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from "react-spinners";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    const from = location.state?.from?.pathname || '/home';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields.');
            return;
        }
        setIsLoading(true);

        try {
            const response = await ApiService.loginUser({ email, password });
            if (response.statusCode === 200) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);

                toast.success('Login successful!');
                setTimeout(() => {
                    navigate(from, { replace: true });
                }, 1500);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally{
            setIsLoading(false); 
        }
    };

    return (
        <div className="auth-container">
            <ToastContainer position="top-right" autoClose={5000} />
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <input type="checkbox" onClick={() => setShowPassword(!showPassword)}/>Show Password 
                <button type="submit" disabled={isLoading}>
                {isLoading ? <ClipLoader size={20} color="#fff" /> : "Login"}
            </button>
            </form>
            <p className="register-link">
                Don't have an account? <a href="/register">Register</a>
            </p>
        </div>
    );
}

export default LoginPage;
