import React, { useState } from 'react';
import ApiService from '../../service/ApiService';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from "react-spinners";

function RegisterPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const isStrongPassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    };

    const validateForm = () => {
        const { name, email, password, phoneNumber } = formData;
        return name && email && password && phoneNumber;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fill all the fields.');
            return;
        }

        if (!isStrongPassword(formData.password)) {
            toast.error('Password must be at least 8 characters, include 1 uppercase, 1 lowercase, and 1 special character.');
            return;
        }
        setIsLoading(true);

        try {
            const response = await ApiService.registerUser(formData);
            if (response.statusCode === 200) {
                toast.success('User registered successfully!');
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    phoneNumber: ''
                });
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setIsLoading(false); // 👈 End
        }
    };

    return (
        <div className="auth-container">
            <ToastContainer position="top-right" autoClose={5000} />
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            paddingRight: "557px",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                        }}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <small style={{ fontSize: "12px", color: "#888" }}>
                        Must be at least 8 characters, include uppercase, lowercase, and special character.
                    </small>
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? <ClipLoader size={20} color="#fff" /> : "Register"}
                </button>
            </form>
            <p className="register-link">
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
}

export default RegisterPage;
