import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUserPage = () => {
    const { userId } = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        name: '',
        password: '',
        email: '',
        phoneNumber: '',
        role: '',
        deviceInfo: '',
    });

    const formData = new FormData();
            formData.append('name', userDetails.name);
            formData.append('password', userDetails.password);
            formData.append('email', userDetails.email);
            formData.append('phoneNumber', userDetails.phoneNumber);
            formData.append('role', userDetails.role);
            formData.append('deviceInfo', userDetails.deviceInfo);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await ApiService.getUser(userId);
                setUserDetails({
                    name: response.user.name,
                    password: response.user.password,
                    email: response.user.email,
                    phoneNumber: response.user.phoneNumber,
                    role: response.user.role,
                    deviceInfo: response.user.deviceInfo,
                });
            } catch (error) {
                toast.error(error.response?.data?.message || error.message);
            }
        };
        fetchUserDetails();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };


    const isStrongPassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    };

    const validateForm = () => {
        const { name, email, password, phoneNumber } = formData;
        return name && email && password && phoneNumber;
    };
    
    const handleUpdate = async () => {
        try {

            const result = await ApiService.updateUser(userId, formData);
            if (!validateForm()) {
                        toast.error('Please fill all the fields.');
                        return;
                    }
        
            if (!isStrongPassword(formData.password)) {
                toast.error('Password must be at least 8 characters, include 1 uppercase, 1 lowercase, and 1 special character.');
                return;
            }
            if (result.statusCode === 200) {
                toast.success('user updated successfully.');
                window.scrollTo({ top: 0, behavior: 'smooth' });

                setTimeout(() => {
                    navigate('/admin/manage-users');
                }, 3000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Do you want to delete this user?')) {
            try {
                const result = await ApiService.deleteUser(userId);
                if (result.statusCode === 200) {
                    toast.success('User Deleted successfully.');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    
                    setTimeout(() => {
                        navigate('/admin/manage-users');
                    }, 3000);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || error.message);
            }
        }
    };

    

    return (
        <div className="edit-room-container">
            <ToastContainer position="top-right" autoClose={5000} />
            <h2>Edit User</h2>
            <div className="edit-user-form">
                <div className="form-group">
                    <label>User Name</label>
                    <input
                        type="text"
                        name="name"
                        value={userDetails.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={userDetails.password}
                        onChange={handleChange}
                    />
                </div>
                <input type="checkbox" onClick={() => setShowPassword(!showPassword)}/>Show Password 
                <div className="form-group">
                    <labelEmail></labelEmail>
                    <input
                        type="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="number"
                        name="phoneNumber"
                        value={userDetails.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>user Type</label>
                    <input
                        type="text"
                        name="role"
                        value={userDetails.role}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Device Info</label>
                    <input
                        type="text"
                        name="deviceInfo"
                        value={userDetails.deviceInfo}
                        onChange={handleChange}
                    />
                </div>
                <button className="update-button" onClick={handleUpdate}>Update user</button>
                <button className="delete-button" onClick={handleDelete}>Delete user</button>
            </div>
        </div>
    );
};

export default EditUserPage;