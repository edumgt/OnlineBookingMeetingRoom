package dhnt.cntt63.bookingroom.controller;

import dhnt.cntt63.bookingroom.dto.Respond;
import dhnt.cntt63.bookingroom.entity.Booking;
import dhnt.cntt63.bookingroom.service.interfac.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private IBookingService bookingService;

    @PostMapping("/book-room/{roomId}/{userId}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public ResponseEntity<Respond> bookRoom(
            @PathVariable Long roomId,
            @PathVariable Long userId,
            @RequestBody Booking bookingRequest
            ){

        Respond respond = bookingService.saveBooking(roomId, userId, bookingRequest);
        return ResponseEntity.status(respond.getStatusCode()).body(respond);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Respond> getAllBooking(){
        Respond respond = bookingService.getAllBookings();
        return ResponseEntity.status(respond.getStatusCode()).body(respond);
    }

    @GetMapping("/get-by-confirmation-code/{confirmationCode}")
    public ResponseEntity<Respond> getBookingByConfirmationCode(@PathVariable String confirmationCode){
        Respond respond = bookingService.findBookingByConfirmationCode(confirmationCode);
        return ResponseEntity.status(respond.getStatusCode()).body(respond);
    }

    @DeleteMapping("/cancel/{bookingId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Respond> cancelBooking(@PathVariable Long bookingId){
        Respond respond = bookingService.cancelBooking(bookingId);
        return ResponseEntity.status(respond.getStatusCode()).body(respond);
    }
}
