import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // 👈 Set root element for accessibility

function Navbar() {
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        ApiService.logout();
        setShowLogoutModal(false);
        navigate('/home');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/home">Inno.C's Rooms</NavLink>
            </div>
            <ul className="navbar-ul">
                <li><NavLink to="/home" activeclassname="active">Home</NavLink></li>
                <li><NavLink to="/rooms" activeclassname="active">Rooms</NavLink></li>
                <li><NavLink to="/find-booking" activeclassname="active">Find my Booking</NavLink></li>

                {isUser && <li><NavLink to="/profile" activeclassname="active">Profile</NavLink></li>}
                {isAdmin && <li><NavLink to="/admin" activeclassname="active">Admin</NavLink></li>}

                {!isAuthenticated &&<li><NavLink to="/login" activeclassname="active">Login</NavLink></li>}
                {!isAuthenticated &&<li><NavLink to="/register" activeclassname="active">Register</NavLink></li>}
                {isAuthenticated && <li onClick={() => setShowLogoutModal(true)}>Logout</li>}
            </ul>

            {/* Modal Confirm */}
            <Modal
                isOpen={showLogoutModal}
                onRequestClose={() => setShowLogoutModal(false)}
                contentLabel="Confirm Logout"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h3>Are you sure you want to logout?</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <button onClick={() => setShowLogoutModal(false)}>Cancel</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </Modal>

        </nav>
    );
}

export default Navbar;