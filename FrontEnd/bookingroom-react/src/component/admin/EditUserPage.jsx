// src/component/admin/EditUserPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { h } from '@fullcalendar/core/preact.js';

const EditUserPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    password: '',
    email: '',
    phoneNumber: '',
    role: '',
    deviceInfo: ''
  });

  const [originalEmail, setOriginalEmail] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { user } = await ApiService.getUser(userId);
        setOriginalEmail(user.email);
        setUserDetails({
          name: user.name,
          password: '',           // never prefill the hashed password
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          deviceInfo: user.deviceInfo
        });
      } catch (e) {
        toast.error(e.response?.data?.message || e.message);
      }
    })();
  }, [userId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const isStrongPassword = pw =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(pw);

  const handleUpdate = async () => {
    const { name, password, email, phoneNumber, role, deviceInfo } = userDetails;

    if (!name || !email || !phoneNumber) {
      toast.error('Please fill in Name, Email and Phone Number.');
      return;
    }
    if (password && !isStrongPassword(password)) {
      toast.error(
        'If you change your password it must be at least 8 characters long, include uppercase, lowercase & special character.'
      );
      return;
    }

    // Build a fresh FormData
    const data = new FormData();
    data.append('name', name);
    data.append('phoneNumber', phoneNumber);
    data.append('role', role);
    data.append('deviceInfo', deviceInfo);

    // Only send email if changed
    if (email !== originalEmail) {
        data.append("email", email);
    }
    // only if user typed a new one
    if (password) {
      data.append('password', password); 
    }
    

    try {
      const result = await ApiService.updateUser(userId, data);
      if (result.statusCode === 200) {
        toast.success('User updated successfully.');
        setTimeout(() => navigate('/admin/manage-users'), 3000);
      }
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Do you really want to delete this user?')) return;
    try {
      const result = await ApiService.deleteUser(userId);
      if (result.statusCode === 200) {
        toast.success('User deleted.');
        setTimeout(() => navigate('/admin/manage-users'), 3000);
      }
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
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
            name="name"
            value={userDetails.name}
            onChange={handleChange}
          />
        </div>

         <div className="form-group">
            <label>Password:</label>
            <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={userDetails.password}
                onChange={handleChange}
            /><br/>
            <small style={{ fontSize: "12px", color: "#888" }}>
                Must be at least 8 characters, include uppercase, lowercase, and special character.
            </small>
        </div>
        <input type="checkbox" onClick={() => setShowPassword(!showPassword)}/>Show Password 


        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={userDetails.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            name="phoneNumber"
            type="tel"
            value={userDetails.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>User Type</label>
          <input
            name="role"
            value={userDetails.role}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Device Info</label>
          <input
            name="deviceInfo"
            value={userDetails.deviceInfo}
            onChange={handleChange}
          />
        </div>

        <button className="update-button" onClick={handleUpdate}>
          Update User
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Delete User
        </button>
      </div>
    </div>
  );
};

export default EditUserPage;
