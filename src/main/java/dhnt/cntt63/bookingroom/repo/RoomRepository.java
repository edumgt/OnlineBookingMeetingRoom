package dhnt.cntt63.bookingroom.repo;
import dhnt.cntt63.bookingroom.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.ZonedDateTime;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query("SELECT DISTINCT r.roomType FROM Room r")
    List <String> findDistinctRoomTypes();

    @Query("SELECT r from Room r WHERE r.id NOT IN (SELECT b.room.id FROM Booking b)")
    List<Room> getAvailableRoom();

@Query("SELECT r FROM Room r where r.roomType LIKE %:roomType% AND r.id NOT IN (SELECT bk.room.id FROM Booking bk " +
        "WHERE (bk.startTime <= bk.endTime) AND (bk.endTime >= bk.startTime)) ")
    List<Room> findAvailableRoomByDateAndTypes(ZonedDateTime startTime, ZonedDateTime endTime, String roomType);
}
