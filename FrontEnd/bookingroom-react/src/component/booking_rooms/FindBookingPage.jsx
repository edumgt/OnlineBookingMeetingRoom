import React, { useState } from 'react';
import ApiService from '../../service/ApiService'; // Assuming your service is in a file called ApiService.js
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FindBookingPage = () => {
    const [confirmationCode, setConfirmationCode] = useState(''); // State variable for confirmation code
    const [bookingDetails, setBookingDetails] = useState(null); // State variable for booking details

    const handleSearch = async () => {
        if (!confirmationCode.trim()) {
            toast.error("Please Enter a booking confirmation code");
            return;
        }
        try {
            // Call API to get booking details
            const response = await ApiService.getBookingByConfirmationCode(confirmationCode);
            setBookingDetails(response.booking);
            toast.success('Found booking');
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="find-booking-page">
            <ToastContainer position="top-right" autoClose={5000} />
            <h2>Find Booking</h2>
            <div className="search-container">
                <input
                    required
                    type="text"
                    placeholder="Enter your booking confirmation code"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                />
                <button onClick={handleSearch}>Find</button>
            </div>
            {bookingDetails && (
                <div className="booking-details">
                    <h3>Booking Details</h3>
                    <h4>Title: {bookingDetails.title}</h4>
                    <p>Confirmation Code: {bookingDetails.bookingConfirmationCode}</p>
                    <p>Start Time: {bookingDetails.startTime}</p>
                    <p>End Time: {bookingDetails.endTime}</p>
                    <p>Description: {bookingDetails.description}</p>

                    <br />
                    <hr />
                    <br />
                    <h3>Booker Details</h3>
                    <div>
                        <p> Name: {bookingDetails.user.name}</p>
                        <p> Email: {bookingDetails.user.email}</p>
                        <p> Phone Number: {bookingDetails.user.phoneNumber}</p>
                    </div>

                    <br />
                    <hr />
                    <br />
                    <h3>Room Details</h3>
                    <div>
                        <p> Room Name: {bookingDetails.room.roomName}</p>
                        <p> Room Type: {bookingDetails.room.roomType}</p>
                        <p> Description: {bookingDetails.room.description}</p>
                        <p> Capacity: {bookingDetails.room.capacity}</p>
                        <img src={bookingDetails.room.roomPhotoURL} alt="" sizes="" srcSet="" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindBookingPage;