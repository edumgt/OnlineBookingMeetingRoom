package dhnt.cntt63.bookingroom.controller;

import dhnt.cntt63.bookingroom.dto.Respond;
import dhnt.cntt63.bookingroom.service.interfac.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private IUserService userService;

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Respond> getAllUsers(){
        Respond respond = userService.getAllUsers();
        return ResponseEntity.status(respond.getStatusCode()).body(respond);
    }

    @GetMapping("/get-by-id/{userId}")
    public ResponseEntity<Respond> getUserById(@PathVariable("userId") String userId){
        Respond respond = userService.getUserById(userId);
        return ResponseEntity.status(respond.getStatusCode()).body(respond);
    }

    @DeleteMapping("/delete/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Respond> deleteUser(@PathVariable("userId") String userId){
        Respond respond = userService.deleteUser(userId);
        return ResponseEntity.status(respond.getStatusCode()).body(respond);
    }

    @GetMapping("/get-logged-id-profile-info/{userId}")
    public ResponseEntity<Respond> getLoggedInUserProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Respond respond = userService.getMyInfo(email);
        return ResponseEntity.status(respond.getStatusCode()).body(respond);
    }

    @GetMapping("/get-user-bookings/{userId}")
    public ResponseEntity<Respond> getUserBookingHistory(@PathVariable("userId") String userId){
        Respond respond = userService.getUserBookingHistory(userId);
        return ResponseEntity.status(respond.getStatusCode()).body(respond);
    }
}
