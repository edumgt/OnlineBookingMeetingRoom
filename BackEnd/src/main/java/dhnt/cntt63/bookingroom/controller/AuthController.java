package dhnt.cntt63.bookingroom.controller;

import dhnt.cntt63.bookingroom.dto.LoginRequest;
import dhnt.cntt63.bookingroom.dto.Respond;
import dhnt.cntt63.bookingroom.entity.User;
import dhnt.cntt63.bookingroom.service.interfac.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private IUserService userService;

    @PostMapping("/register")
    public ResponseEntity<Respond> register(@RequestBody User user){
        Respond respond = userService.register(user);
        return ResponseEntity.status(respond.getStatusCode()).body(respond);
    }

    @PostMapping("/login")
    public ResponseEntity<Respond> login(@RequestBody LoginRequest loginRequest){
        Respond respond = userService.login(loginRequest);
        return ResponseEntity.status(respond.getStatusCode()).body(respond);
    }
}
