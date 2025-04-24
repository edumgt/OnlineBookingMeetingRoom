package dhnt.cntt63.bookingroom.service.interfac;

import dhnt.cntt63.bookingroom.dto.Respond;
import dhnt.cntt63.bookingroom.entity.Booking;

public interface IBookingService {
    Respond saveBooking(Long roomId, Long userId, Booking bookingRequest);
    Respond findBookingByConfirmationCode(String confirmationCode);
    Respond getAllBookings();
    Respond cancelBooking(Long bookingId);
}
