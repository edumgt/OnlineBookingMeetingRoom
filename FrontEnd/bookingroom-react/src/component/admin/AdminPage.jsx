import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../../service/ApiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPage = () => {
    const [adminName, setAdminName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminName = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setAdminName(response.user.name);
            } catch (error) {
                toast.error('Error fetching admin details:', error.message);
            }
        };

        fetchAdminName();
    }, []);

    return (
        <div className="admin-page">
            <ToastContainer position="top-right" autoClose={5000} />
            <h1 className="welcome-message">Welcome, {adminName}</h1>
            <div className="admin-actions">
                <button className="admin-button" onClick={() => navigate('/admin/manage-rooms')}>
                    Manage Rooms
                </button>
                <button className="admin-button" onClick={() => navigate('/admin/manage-bookings')}>
                    Manage Bookings
                </button>
            </div>
        </div>
    );
}

export default AdminPage;