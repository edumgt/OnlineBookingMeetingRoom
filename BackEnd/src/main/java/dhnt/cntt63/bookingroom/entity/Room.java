package dhnt.cntt63.bookingroom.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message="Room name is required!")
    @Column(name = "room_name")
    private String roomName;

    @NotNull(message="Room type is required!")
    @Column(name = "room_type")
    private String roomType;

    @NotNull(message="Room photo is required!")
    @Column(name = "room_photo_url")
    private String roomPhotoURL;

    @Min(value=1, message = "Capacity should not be less than 1!")
    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "description")
    private String description;
    @Column(name = "created_at")
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    @Column(name = "status")
    private String status;

    @OneToMany(mappedBy     = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Booking> bookings = new ArrayList<>();


    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", roomName='" + roomName + '\'' +
                ", roomType='" + roomType + '\'' +
                ", roomPhotoURL='" + roomPhotoURL + '\'' +
                ", capacity=" + capacity +
                ", description='" + description + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt + '\'' +
                ", status=" + status +
                '}';
    }
}
