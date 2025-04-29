package dhnt.cntt63.bookingroom.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BookingDTO {
    private Long id;

    private String title;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String status;

    private String bookingConfirmationCode;

    private UserDTO user;

    private RoomDTO room;

}
