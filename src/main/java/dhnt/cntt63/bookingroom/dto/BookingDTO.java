package dhnt.cntt63.bookingroom.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import dhnt.cntt63.bookingroom.entity.Room;
import dhnt.cntt63.bookingroom.entity.User;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BookingDTO {
    private long id;

    private String title;

    private ZonedDateTime startTime;

    private ZonedDateTime endTime;

    private String description;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
    private String status;

    private String bookingConfirmationCode;

    private UserDTO user;

    private RoomDTO room;
}
