package dhnt.cntt63.bookingroom.service.interfac;

import dhnt.cntt63.bookingroom.dto.Respond;
import org.springframework.web.multipart.MultipartFile;

import java.time.ZonedDateTime;
import java.util.List;

public interface IRoomService {

    Respond addNewRoom(String roomName, String roomType, MultipartFile photo, Integer capacity, String description);
    List<String> getAllRoomTypes();
    Respond getAllRooms();
    Respond deleteRoom(Long roomId);
    Respond updateRoom(Long roomId, String roomName, String roomType, MultipartFile photo, Integer capacity, String description);
    Respond getRoomById(Long roomId);
    Respond getAvailableRoomByDateAndType(ZonedDateTime startTime, ZonedDateTime endTime, String roomType);
    Respond getAllAvailableRooms();
}
