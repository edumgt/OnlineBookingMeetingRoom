package dhnt.cntt63.bookingroom.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RoomDTO {
    private Long id;
    private String roomName;
    private String roomType;
    private String roomPhotoURL;
    private Integer capacity;

    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String status;

    private List<BookingDTO> bookings = new ArrayList<>();

}
