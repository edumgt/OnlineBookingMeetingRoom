package dhnt.cntt63.bookingroom.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import dhnt.cntt63.bookingroom.entity.Booking;
import lombok.Data;

import java.time.LocalDateTime;
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

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String deviceInfo;

    private String status;


    private List<BookingDTO> bookings;

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setDeviceInfo(String deviceInfo) {
        this.deviceInfo = deviceInfo;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setBookings(List<BookingDTO> bookings) {
        this.bookings = bookings;
    }
}
