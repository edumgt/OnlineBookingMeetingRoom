import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService'; // Assuming your service is in a file called ApiService.js
import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

const RoomDetailsPage = () => {
  const navigate = useNavigate(); // Access the navigate function to navigate
  const { roomId } = useParams(); // Get room ID from URL parameters
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [roomDescription, setRoomDescription] = useState(null); // State variable for roomDescription
  const [capacity, setCapacity] = useState(null);
  const [roomType, setRoomType] = useState(null);
  const [roomPhotoURL, setRoomPhotoURL] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [title, setTitle] = useState(null); // State variable for title
  const [bookingDescription, setBookingDescription] = useState(null); // State variable for end time
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track any errors
  const [startTime, setStartTime] = useState(null); // State variable for start time
  const [endTime, setEndTime] = useState(null); // State variable for end time
  const [showDatePicker, setShowDatePicker] = useState(false); // State variable to control date picker visibility
  const [userId, setUserId] = useState(''); // Set user id
  const [showMessage, setShowMessage] = useState(false); // State variable to control message visibility
  const [confirmationCode, setConfirmationCode] = useState(''); // State variable for booking confirmation code
  const [errorMessage, setErrorMessage] = useState(''); // State variable for error message

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading state to true
        const response = await ApiService.getRoomById(roomId);
        const room = response.room;

        setRoomDetails(response.room);

        setRoomName(room.roomName);
        setCapacity(room.capacity);
        setTitle(room.title);
        setRoomDescription(room.description); 
        setRoomType(room.roomType);
        setRoomPhotoURL(room.roomPhotoURL);
        setBookings(room.bookings); 

        
        const userProfile = await ApiService.getUserProfile();
        setUserId(userProfile.user.id);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching or error
      }
    };
    fetchData();
  }, [roomId]); // Re-run effect when roomId changes



  const handleConfirmBooking = async () => {

    // Check if check-in and check-out dates are selected
    if (!startTime || !endTime) {
      setErrorMessage('Please select check-in and check-out dates.');
      setTimeout(() => setErrorMessage(''), 5000); // Clear error message after 5 seconds
      return;
    }

    try {

      // Convert dates to YYYY-MM-DD format, adjusting for time zone differences
      const formattedStartTime = new Date(startTime.getTime() - (startTime.getTimezoneOffset() * 60000)).toISOString();
      const formattedEndTime = new Date(endTime.getTime() - (endTime.getTimezoneOffset() * 60000)).toISOString();


      // Log the original dates for debugging
      console.log("Formated Check-in Date:", formattedStartTime);
      console.log("Formated Check-out Date:", formattedEndTime);

      // Create booking object
      const booking = {
        title: title,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        bookingDescription: bookingDescription
      };
      console.log(booking)
      console.log(endTime)

      // Make booking
      const response = await ApiService.bookRoom(roomId, userId, booking);
      if (response.statusCode === 200) {
        setConfirmationCode(response.bookingConfirmationCode); // Set booking confirmation code
        setShowMessage(true); // Show message
        // Hide message and navigate to homepage after 5 seconds
        setTimeout(() => {
          setShowMessage(false);
          navigate('/rooms'); // Navigate to rooms
        }, 10000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(''), 5000); // Clear error message after 5 seconds
    }
  };

  if (isLoading) {
    return <p className='room-detail-loading'>Loading room details...</p>;
  }

  if (error) {
    return <p className='room-detail-loading'>{error}</p>;
  }

  if (!roomDetails) {
    return <p className='room-detail-loading'>Room not found.</p>;
  }


  return (
    <div className="room-details-booking">
      {showMessage && (
        <p className="booking-success-message">
          Booking successful! Confirmation code: {confirmationCode}. An SMS and email of your booking details have been sent to you.
        </p>
      )}
      {errorMessage && (
        <p className="error-message">
          {errorMessage}
        </p>
      )}
      <h2>Room Details</h2>
      <br />
      <img src={roomPhotoURL} alt={roomType} className="room-details-image" />
      <div className="room-details-info">
        <h3>{roomName}</h3>
        <p>Room Type: {roomType}</p>
        <p>Capacity: {capacity}</p>
        <p>Room Description: {roomDescription}</p>
      </div>
      {bookings && bookings.length > 0 && (
        <div>
          <h3>Existing Booking Details</h3>
          <ul className="booking-list">
            {bookings.map((booking, index) => (
              <li key={booking.id} className="booking-item">
                <span className="booking-number">Booking {index + 1} </span> <br/>
                <span className="booking-text">Title: {booking.title} </span> <br/>

                <span className="booking-text">Start Time: {booking.startTime} </span> <br/>
                <span className="booking-text">End Time: {booking.endTime}</span> <br/>
                <span className="booking-text">Booking Description: {booking.description} </span> <br/>

              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="booking-info">
        <button className="book-now-button" onClick={() => setShowDatePicker(true)}>Book Now</button>
        <button className="go-back-button" onClick={() => setShowDatePicker(false)}>Go Back</button> <br/>
        {showDatePicker && (
          <div className="date-picker-container">
            {/* Nhập Title */}
            <input
              type="text"
              className="detail-search-field"
              placeholder="Enter Booking Title"
              value={title || ''}
              onChange={(e) => setTitle(e.target.value)}
            /> <br/>

            <DatePicker
              className="detail-search-field"
              selected={startTime}
              onChange={(date) => setStartTime(date)}
              selectsStart
              startTime={startTime}
              endTime={endTime}
              showTimeSelect
              placeholderText="Start Time"
              dateFormat="yyyy-MM-dd HH:mm"
              timeFormat="HH:mm"
              timeIntervals={15}
            />
            <DatePicker
              className="detail-search-field"
              selected={endTime}
              onChange={(date) => setEndTime(date)}
              selectsEnd
              startTime={startTime}
              endTime={endTime}
              minDate={startTime}
              showTimeSelect
              placeholderText="End Time"
              dateFormat="yyyy-MM-dd HH:mm"
              timeFormat="HH:mm"
              timeIntervals={15}
            /><br/>

            {/* Nhập Booking Description */}
            <textarea
              className="detail-search-field"
              placeholder="Enter Booking Description"
              rows="4" cols="50"
              value={bookingDescription || ''}
              onChange={(e) => setBookingDescription(e.target.value)}
            ></textarea>
          </div>
        )}
        {(
          <div className="total-price">
            <button className="confirm-booking" onClick={handleConfirmBooking}>Confirm Booking</button>
            <button className="confirm-booking" onClick={() => navigate('/rooms')}>Cancel Booking</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetailsPage;