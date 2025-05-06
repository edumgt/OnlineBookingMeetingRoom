import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService'; // Assuming your service is in a file called ApiService.js
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditBookingPage = () => {
    const navigate = useNavigate();
    const { bookingCode } = useParams();
    const [bookingDetails, setBookingDetails] = useState(null); // State variable for booking details



    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await ApiService.getBookingByConfirmationCode(bookingCode);
                setBookingDetails(response.booking);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchBookingDetails();
    }, [bookingCode]);


    const achieveBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to Achieve this booking?')) {
            return; // Do nothing if the user cancels
        }

        try {
            const response = await ApiService.cancelBooking(bookingId);
            if (response.statusCode === 200) {
                toast.success("The booking was Successfully Achieved")
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                setTimeout(() => {
                    navigate('/admin/manage-bookings');
                }, 3000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="find-booking-page">
            <ToastContainer position="top-right" autoClose={5000} />
            <h2>Booking Detail</h2>
            {bookingDetails && (
                <div className="booking-details">
                    <h3>Booking Details</h3>
                    <h4>Title: {bookingDetails.title}</h4>
                    <p>Confirmation Code: {bookingDetails.bookingConfirmationCode}</p>
                    <p>Start Time: {bookingDetails.startTime}</p>
                    <p>End Time: {bookingDetails.endTime}</p>
                    <p>Description: {bookingDetails.description}</p>
                    <p>Guest Email: {bookingDetails.guestEmail}</p>

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
                        <img src={bookingDetails.room.roomPhotoURL} alt="Room" className="room-photo" srcSet="" />
                    </div>
                    <button
                        className="achieve-booking"
                        onClick={() => achieveBooking(bookingDetails.id)}>Achieve Booking
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditBookingPage;