package dhnt.cntt63.bookingroom.controller;

import dhnt.cntt63.bookingroom.dto.Respond;
import dhnt.cntt63.bookingroom.service.interfac.IBookingService;
import dhnt.cntt63.bookingroom.service.interfac.IRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/rooms")
public class RoomController {
    @Autowired
    private IRoomService roomService;

    @Autowired
    private IBookingService bookingService;

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Respond> addNewRoom(
            @RequestParam(value = "roomName", required = false)String roomName,
            @RequestParam(value = "roomType", required = false)String roomType,
            @RequestParam(value = "photo", required = false)MultipartFile photo,
            @RequestParam(value = "capacity", required = false)Integer capacity,
            @RequestParam(value = "description", required = false)String description
            ){
        if(roomName == null || roomName.isBlank() ||roomType == null || roomType.isBlank() || photo == null || photo.isEmpty() || capacity == null){
            Respond respond = new Respond();
            respond.setStatusCode(400);
            respond.setMessage("Please Provide value for all fields (roomName, roomType, photo, capacity)");
        }
        Respond respond = roomService.addNewRoom(roomName, roomType, photo, capacity, description);
        return ResponseEntity.status(respond.getStatusCode()).body(respond);
    }

    @GetMapping("/all")
    public ResponseEntity<Respond> getAllRooms(){
        Respond respond = roomService.getAllRooms();
        return ResponseEntity.status(respond.getStatusCode()).body(respond);
    }

    @GetMapping("/types")
    public List<String> getAllRoomTypes(){
        return roomService.getAllRoomTypes();
    }

    @GetMapping("/room-by-id/{roomId}")
    public ResponseEntity<Respond> getRoomById(@PathVariable Long roomId){
        Respond respond = roomService.getRoomById(roomId);
        return ResponseEntity.status(respond.getStatusCode()).body(respond);
    }

    @GetMapping("/all-available-rooms")
    public ResponseEntity<Respond> getAllAvailableRooms(){
        Respond respond = roomService.getAllAvailableRooms();
        return ResponseEntity.status(respond.getStatusCode()).body(respond);
    }

    @GetMapping("/available-rooms-by-date-and-type")
    public ResponseEntity<Respond> getAvailableRoomByDateAndType(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)LocalDateTime endTime,
            @RequestParam(required = false) String roomType
            ){

        if(startTime == null ||endTime == null || roomType.isBlank()){
            Respond respond = new Respond();
            respond.setStatusCode(400);
            respond.setMessage("All fields are required (startTime, endTime, roomType)");
        }

        Respond respond = roomService.getAvailableRoomByDateAndType(startTime, endTime, roomType);
        return ResponseEntity.status(respond.getStatusCode()).body(respond);
    }

    @PutMapping("/update/{roomId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Respond> updateRoom(
            @PathVariable("roomId") Long roomId,
            @RequestParam(value = "roomName", required = false)String roomName,
            @RequestParam(value = "roomType", required = false)String roomType,
            @RequestParam(value = "photo", required = false)MultipartFile photo,
            @RequestParam(value = "capacity", required = false)Integer capacity,
            @RequestParam(value = "description", required = false)String description
            ){
        Respond respond = roomService.updateRoom(roomId, roomName, roomType, photo, capacity, description);
        return ResponseEntity.status(respond.getStatusCode()).body(respond);
    }

    @DeleteMapping("/delete/{roomId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Respond> deleteRoom(@PathVariable Long roomId){
        Respond respond = roomService.deleteRoom(roomId);
        return ResponseEntity.status(respond.getStatusCode()).body(respond);
    }

}
