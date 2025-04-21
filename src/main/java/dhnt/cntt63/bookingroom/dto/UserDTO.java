package dhnt.cntt63.bookingroom.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import dhnt.cntt63.bookingroom.entity.Booking;
import lombok.Data;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {
    private Long id;
    private String name;
    private String password;
    private String email;
    private String phoneNumber;
    private String role;

    private ZonedDateTime createdAt;

    private ZonedDateTime updatedAt;

    private String deviceInfo;

    private String status;


    private List<BookingDTO> bookings;
}
