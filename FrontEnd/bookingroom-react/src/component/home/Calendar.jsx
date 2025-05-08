import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

const MyCalendarPage = () => {
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                const userPlusBookings = await ApiService.getUserBookings(response.user.id);
                setUser(userPlusBookings.user);

                // Chuyển bookings thành events của calendar
                const transformedEvents = userPlusBookings.user.bookings.map(booking => ({
                    title: booking.room.name,
                    start: booking.startDateTime,
                    end: booking.endDateTime,
                }));
                setEvents(transformedEvents);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div>
            <h2>Lịch đặt phòng của bạn</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,listWeek'
                }}
                events={events}
                height="auto"
            />
        </div>
    );
};

export default MyCalendarPage;
