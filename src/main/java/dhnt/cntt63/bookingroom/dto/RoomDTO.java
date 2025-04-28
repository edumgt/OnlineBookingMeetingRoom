package dhnt.cntt63.bookingroom.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;
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
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String status;

    private List<BookingDTO> bookings = new ArrayList<>();

    public void setId(long id) {
        this.id = id;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public void setRoomPhotoURL(String roomPhotoURL) {
        this.roomPhotoURL = roomPhotoURL;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setBookings(List<BookingDTO> bookings) {
        this.bookings = bookings;
    }
}
