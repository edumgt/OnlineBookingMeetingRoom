package dhnt.cntt63.bookingroom.repo;

import dhnt.cntt63.bookingroom.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    Optional<Booking> findBookingConfirmationCode();

}
