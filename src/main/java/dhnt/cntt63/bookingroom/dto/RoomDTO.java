package dhnt.cntt63.bookingroom.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RoomDTO {
    private long id;
    private String roomName;
    private String roomType;
    private String roomPhotoURL;
    private Integer capacity;

    private String description;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
    private String status;

    private List<BookingDTO> bookings = new ArrayList<>();
}
