import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Modal from 'react-modal';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                // Fetch user bookings using the fetched user ID
                const userPlusBookings = await ApiService.getUserBookings(response.user.id);
                setUser(userPlusBookings.user)

            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        ApiService.logout();
        setShowLogoutModal(false);
        navigate('/home');
    };

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    return (
        <div className="profile-page">
            {user && <h2>Welcome, {user.name}</h2>}
            <div className="profile-actions">
                <button className="edit-profile-button" onClick={handleEditProfile}>Edit Profile</button>
                <button className="logout-button" onClick={() => setShowLogoutModal(true)}>Logout</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {user && (
                <div className="profile-details">
                    <h3>My Profile Details</h3>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                </div>
            )}

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

            <div className="bookings-section">
                <h3>My Booking History</h3>
                <div className="booking-list">
                    {user && user.bookings?.length > 0 ? (
                        user.bookings.map((booking) => (
                            <div key={booking.id} className="booking-item">
                                <h4><strong>Title:</strong> {booking.title}</h4>
                                <p><strong>Booking Code:</strong> {booking.bookingConfirmationCode}</p>
                                <p><strong>Start Time:</strong> {booking.startTime}</p>
                                <p><strong>End Time:</strong> {booking.endTime}</p>
                                <p><strong>Description:</strong> {booking.description}</p>
                                <p><strong>Room Name:</strong> {booking.room.roomName}</p>
                                <p><strong>Room Type:</strong> {booking.room.roomType}</p>
                                <p><strong>Room Capacity:</strong> {booking.room.capacity}</p>
                                <img src={booking.room.roomPhotoURL} alt="Room" className="room-photo" />
                            </div>
                        ))
                    ) : (
                        <p>No bookings found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;