import React, { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

const MyCalendarPage = () => {
    const [events, setEvents] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                const userPlusBookings = await ApiService.getUserBookings(response.user.id);
                
                setUser(userPlusBookings.user);

                const transformedEvents = userPlusBookings.user.bookings.map(booking => ({
                    

                    title: booking.title,
                    start: booking.startTime,
                    end: booking.endTime,
                }));

                setEvents(transformedEvents);
            } catch (error) {
                toast.error(error.response?.data?.message || error.message);
            }
        };

        fetchUserProfile();
    }, []);


    return (
        <div className='calendar-page'>
            <ToastContainer position="top-right" autoClose={5000} closeOnClick />
            <h2>{user ? `${user.name}'s Calendar` : 'Loading Calendar...'}</h2>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,listWeek'
                }}
                displayEventEnd={true}
                events={events}
                height="auto"
            />
        </div>
    );
};

export default MyCalendarPage;
