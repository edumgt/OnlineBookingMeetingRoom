package dhnt.cntt63.bookingroom.service.impl;

import dhnt.cntt63.bookingroom.dto.BookingDTO;
import dhnt.cntt63.bookingroom.dto.Respond;
import dhnt.cntt63.bookingroom.dto.RoomDTO;
import dhnt.cntt63.bookingroom.entity.Booking;
import dhnt.cntt63.bookingroom.entity.Room;
import dhnt.cntt63.bookingroom.entity.User;
import dhnt.cntt63.bookingroom.exception.OurException;
import dhnt.cntt63.bookingroom.repo.BookingRepository;
import dhnt.cntt63.bookingroom.repo.RoomRepository;
import dhnt.cntt63.bookingroom.repo.UserRepository;
import dhnt.cntt63.bookingroom.service.interfac.IBookingService;
import dhnt.cntt63.bookingroom.service.interfac.IRoomService;
import dhnt.cntt63.bookingroom.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class BookingService implements IBookingService {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private IRoomService roomService;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private UserRepository userRepository;


    @Override
    public Respond saveBooking(Long roomId, Long userId, Booking bookingRequest) {
        Respond respond = new Respond();

        try {
            if(bookingRequest.getEndTime().isBefore(bookingRequest.getStartTime())){
                throw new IllegalArgumentException("Start time must be before End time");
            }
            Room room = roomRepository.findById(roomId).orElseThrow(()-> new OurException("Room Not Found"));
            User user = userRepository.findById(userId).orElseThrow(()-> new OurException("User Not Found"));

            List<Booking> existingBookings = room.getBookings();
            if(!roomIsAvailable(bookingRequest, existingBookings)){
                throw new OurException("Room Not Available for the selected time range");
            }
            bookingRequest.setRoom(room);
            bookingRequest.setUser(user);
            String bookingConfirmationCode = Utils.generateRandomConfirmationCode(10);
            bookingRequest.setBookingConfirmationCode(bookingConfirmationCode);
            bookingRepository.save(bookingRequest);

            respond.setStatusCode(200);
            respond.setMessage("Successful");
            respond.setBookingConfirmationCode(bookingConfirmationCode);

        } catch (OurException e){
            respond.setStatusCode(404);
            respond.setMessage(e.getMessage());

        } catch (Exception e){
            respond.setStatusCode(500);
            respond.setMessage("Error Saving a booking" + e.getMessage());

        }
        return respond;
    }

    @Override
    public Respond findBookingByConfirmationCode(String confirmationCode) {
        Respond respond = new Respond();

        try {
            Booking booking = bookingRepository.findByBookingConfirmationCode(confirmationCode).orElseThrow(()-> new OurException("Booking Not Found"));
            BookingDTO bookingDTO = Utils.mapBookingEntityToBookingDTOPlusBookedRooms(booking, true);

            respond.setStatusCode(200);
            respond.setMessage("Successful");
            respond.setBooking(bookingDTO);

        } catch (OurException e){
            respond.setStatusCode(404);
            respond.setMessage(e.getMessage());

        } catch (Exception e){
            respond.setStatusCode(500);
            respond.setMessage("Error Getting Booking by confirmation code" + e.getMessage());

        }
        return respond;
    }

    @Override
    public Respond getAllBookings() {
        Respond respond = new Respond();

        try {
            List<Booking> bookingList = bookingRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<BookingDTO> bookingDTOList = Utils.mapBookingListEntityToBookingListDTO(bookingList);

            respond.setStatusCode(200);
            respond.setMessage("Successful");
            respond.setBookingList(bookingDTOList);

        } catch (Exception e){
            respond.setStatusCode(500);
            respond.setMessage("Error Getting all Bookings" + e.getMessage());

        }
        return respond;
    }

    @Override
    public Respond cancelBooking(Long bookingId) {
        Respond respond = new Respond();

        try {
            bookingRepository.findById(bookingId).orElseThrow(()-> new OurException("Booking Not Found"));
            bookingRepository.deleteById(bookingId);

            respond.setStatusCode(200);
            respond.setMessage("Successful");


        } catch (OurException e){
            respond.setStatusCode(404);
            respond.setMessage(e.getMessage());

        } catch (Exception e){
            respond.setStatusCode(500);
            respond.setMessage("Error Canceling a Booking" + e.getMessage());

        }
        return respond;
    }

    private boolean roomIsAvailable(Booking bookingRequest, List<Booking> existingBookings){
        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        bookingRequest.getStartTime().equals(existingBooking.getStartTime())
                            || bookingRequest.getEndTime().isBefore(existingBooking.getEndTime())
                            || (bookingRequest.getStartTime().isAfter(existingBooking.getStartTime())
                            && bookingRequest.getStartTime().isBefore(existingBooking.getEndTime()))
                            || (bookingRequest.getStartTime().isBefore(existingBooking.getStartTime())

                            && bookingRequest.getEndTime().equals(existingBooking.getEndTime()))
                            || (bookingRequest.getStartTime().isBefore(existingBooking.getStartTime())

                            && bookingRequest.getEndTime().isAfter(existingBooking.getEndTime()))

                            || (bookingRequest.getStartTime().equals(existingBooking.getEndTime())
                            && bookingRequest.getEndTime().equals(existingBooking.getStartTime()))

                            || (bookingRequest.getStartTime().equals(existingBooking.getEndTime())
                            && bookingRequest.getEndTime().equals(bookingRequest.getStartTime()))
                );

    }

}
