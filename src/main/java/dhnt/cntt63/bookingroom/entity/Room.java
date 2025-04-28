package dhnt.cntt63.bookingroom.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull(message="Room name is required!")
    @Column(name = "roomName")
    private String roomName;

    @NotNull(message="Room type is required!")
    @Column(name = "roomType")
    private String roomType;

    @NotNull(message="Room photo is required!")
    @Column(name = "roomPhotoURL")
    private String roomPhotoURL;

    @Min(value=1, message = "Capacity should not be less than 1!")
    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "description")
    private String description;
    @Column(name = "createdAt")
    private ZonedDateTime createdAt;
    @Column(name = "updatedAt")
    private ZonedDateTime updatedAt;
    @Column(name = "status")
    private String status;

    @OneToMany(mappedBy     = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Booking> bookings = new ArrayList<>();


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public String getRoomPhotoURL() {
        return roomPhotoURL;
    }

    public void setRoomPhotoURL(String roomPhotoURL) {
        this.roomPhotoURL = roomPhotoURL;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public ZonedDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(ZonedDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

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
