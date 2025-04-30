package dhnt.cntt63.bookingroom.service.impl;

import dhnt.cntt63.bookingroom.dto.Respond;
import dhnt.cntt63.bookingroom.dto.RoomDTO;
import dhnt.cntt63.bookingroom.entity.Room;
import dhnt.cntt63.bookingroom.exception.OurException;
import dhnt.cntt63.bookingroom.repo.BookingRepository;
import dhnt.cntt63.bookingroom.repo.RoomRepository;
import dhnt.cntt63.bookingroom.service.AwsS3Service;
import dhnt.cntt63.bookingroom.service.interfac.IRoomService;
import dhnt.cntt63.bookingroom.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RoomService implements IRoomService {


    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private AwsS3Service awsS3Service;


    @Override
    public Respond addNewRoom(String roomName, String roomType, MultipartFile photo, Integer capacity, String description) {
        Respond respond = new Respond();

        try {
            String imageUrl = awsS3Service.saveImagesToS3(photo);
            Room room = new Room();
            room.setRoomPhotoURL(imageUrl);
            room.setRoomName(roomName);
            room.setRoomType(roomType);
            room.setCapacity(capacity);
            room.setDescription(description);

            Room savedRoom = roomRepository.save(room);
            RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTO(savedRoom);

            respond.setRoom(roomDTO);
            respond.setStatusCode(200);
            respond.setMessage("Successful");

        } catch (Exception e){
            respond.setStatusCode(500);
            respond.setMessage("Error Saving a room" + e.getMessage());

        }
        return respond;
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public Respond getAllRooms() {
        Respond respond = new Respond();

        try {
            List<Room> roomList = roomRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(roomList);

            respond.setStatusCode(200);
            respond.setMessage("Successful");
            respond.setRoomList(roomDTOList);

        } catch (Exception e){
            respond.setStatusCode(500);
            respond.setMessage("Error Getting all rooms" + e.getMessage());

        }
        return respond;
    }

    @Override
    public Respond deleteRoom(Long roomId) {
        Respond respond = new Respond();

        try {
            roomRepository.findById(roomId).orElseThrow(()-> new OurException("Room Not Found"));
            roomRepository.deleteById(roomId);

            respond.setStatusCode(200);
            respond.setMessage("Successful");

        } catch (OurException e){
            respond.setStatusCode(404);
            respond.setMessage(e.getMessage());

        } catch (Exception e){
            respond.setStatusCode(500);
            respond.setMessage("Error Deleting a rooms" + e.getMessage());

        }
        return respond;
    }

    @Override
    public Respond updateRoom(Long roomId, String roomName, String roomType, MultipartFile photo, Integer capacity, String description) {
        Respond respond = new Respond();

        try {
            String imageUrl = null;

            if(photo != null && !photo.isEmpty()){
                imageUrl = awsS3Service.saveImagesToS3(photo);
            }

            Room room = roomRepository.findById(roomId).orElseThrow(()-> new OurException("Room Not Found"));
            if(roomName != null) room.setRoomName(roomName);
            if(roomType != null) room.setRoomType(roomType);
            if(imageUrl != null) room.setRoomPhotoURL(imageUrl);
            if(capacity != null) room.setCapacity(capacity);
            if(description != null) room.setDescription(description);

            Room updatedRoom = roomRepository.save(room);
            RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTO(updatedRoom);

            respond.setStatusCode(200);
            respond.setMessage("Successful");
            respond.setRoom(roomDTO);

        } catch (OurException e){
            respond.setStatusCode(404);
            respond.setMessage(e.getMessage());

        } catch (Exception e){
            respond.setStatusCode(500);
            respond.setMessage("Error Updating a room" + e.getMessage());

        }
        return respond;
    }

    @Override
    public Respond getRoomById(Long roomId) {
        Respond respond = new Respond();

        try {
            Room room = roomRepository.findById(roomId).orElseThrow(()-> new OurException("Room Not Found"));
            RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTOPlusBookingDTO(room);

            respond.setStatusCode(200);
            respond.setMessage("Successful");
            respond.setRoom(roomDTO);

        } catch (OurException e){
            respond.setStatusCode(404);
            respond.setMessage(e.getMessage());

        } catch (Exception e){
            respond.setStatusCode(500);
            respond.setMessage("Error Geting a room by id" + e.getMessage());

        }
        return respond;
    }

    @Override
    public Respond getAvailableRoomByDateAndType(LocalDateTime startTime, LocalDateTime endTime, String roomType) {
        Respond respond = new Respond();

        try {
            List<Room> roomList = roomRepository.findAvailableRoomByDateAndTypes(startTime, endTime, roomType);
            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(roomList);

            respond.setStatusCode(200);
            respond.setMessage("Successful");
            respond.setRoomList(roomDTOList);

        } catch (Exception e){
            respond.setStatusCode(500);
            respond.setMessage("Error Getting a rooms by date and type" + e.getMessage());

        }
        return respond;
    }

    @Override
    public Respond getAllAvailableRooms() {
        Respond respond = new Respond();

        try {
            List<Room> roomList = roomRepository.getAllAvailableRoom();
            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(roomList);

            respond.setStatusCode(200);
            respond.setMessage("Successful");
            respond.setRoomList(roomDTOList);

        } catch (Exception e){
            respond.setStatusCode(500);
            respond.setMessage("Error Getting all available rooms" + e.getMessage());

        }
        return respond;
    }
}
