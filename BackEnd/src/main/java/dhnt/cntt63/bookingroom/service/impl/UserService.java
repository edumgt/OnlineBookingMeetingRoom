package dhnt.cntt63.bookingroom.service.impl;

import dhnt.cntt63.bookingroom.dto.LoginRequest;
import dhnt.cntt63.bookingroom.dto.Respond;
import dhnt.cntt63.bookingroom.dto.UserDTO;
import dhnt.cntt63.bookingroom.entity.User;
import dhnt.cntt63.bookingroom.exception.OurException;
import dhnt.cntt63.bookingroom.repo.UserRepository;
import dhnt.cntt63.bookingroom.service.interfac.IUserService;
import dhnt.cntt63.bookingroom.utils.JWTUtils;
import dhnt.cntt63.bookingroom.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public Respond register(User user) {
        Respond respond = new Respond();

        try {
            if(user.getRole() == null || user.getRole().isBlank()){
                user.setRole("USER");
            }

            if(userRepository.existsByEmail(user.getEmail())){
                throw new OurException(user.getEmail() + " " + "Already Exists");
            }

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(user);
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(savedUser);

            respond.setStatusCode(200);
            respond.setUser(userDTO);
            respond.setMessage("Successful");

        }catch (OurException e){
            respond.setStatusCode(400);
            respond.setMessage(e.getMessage());

        } catch (Exception e){
            respond.setStatusCode(500);
            respond.setMessage("Error Saving a User" + e.getMessage());

        }
        return respond;
    }

    @Override
    public Respond login(LoginRequest loginRequest) {
        Respond respond = new Respond();

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(()-> new OurException("User Not Found"));
            var token = jwtUtils.generateToken(user);
            respond.setToken(token);
            respond.setExpirationTime("7 days");
            respond.setRole(user.getRole());

            respond.setStatusCode(200);
            respond.setMessage("Successful");

        }catch (OurException e){
            respond.setStatusCode(404);
            respond.setMessage(e.getMessage());

        } catch (Exception e){
            respond.setStatusCode(500);
            respond.setMessage("Error Logging in" + e.getMessage());

        }
        return respond;
    }

    @Override
    public Respond getAllUsers() {
        Respond respond = new Respond();

        try {
            List<User> userList = userRepository.findAll();
            List<UserDTO> userDTOList = Utils.mapUserListEntityToUserListDTO(userList);

            respond.setUserList(userDTOList);
            respond.setStatusCode(200);
            respond.setMessage("Successful");

        } catch (Exception e){
            respond.setStatusCode(500);
            respond.setMessage("Error Getting all users" + e.getMessage());

        }
        return respond;
    }

    @Override
    public Respond getUserBookingHistory(String userId) {
        Respond respond = new Respond();

        try {
            User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(()-> new OurException("User Not Found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTOPlusUserBookingAndRoom(user);

            respond.setStatusCode(200);
            respond.setMessage("Successful");
            respond.setUser(userDTO);

        }catch (OurException e){
            respond.setStatusCode(404);
            respond.setMessage(e.getMessage());

        } catch (Exception e){
            respond.setStatusCode(500);
            respond.setMessage("Error Getting user bookings" + e.getMessage());

        }
        return respond;
    }

    @Override
    public Respond deleteUser(String userId) {
        Respond respond = new Respond();

        try {
            userRepository.findById(Long.valueOf(userId)).orElseThrow(()-> new OurException("User Not Found"));
            userRepository.deleteById(Long.valueOf(userId));

            respond.setStatusCode(200);
            respond.setMessage("Successful");

        }catch (OurException e){
            respond.setStatusCode(404);
            respond.setMessage(e.getMessage());

        } catch (Exception e){
            respond.setStatusCode(500);
            respond.setMessage("Error Deleting a user" + e.getMessage());

        }
        return respond;
    }

    @Override
    public Respond getUserById(String userId) {
        Respond respond = new Respond();

        try {
            User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(()-> new OurException("User Not Found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);

            respond.setStatusCode(200);
            respond.setMessage("Successful");
            respond.setUser(userDTO);

        }catch (OurException e){
            respond.setStatusCode(404);
            respond.setMessage(e.getMessage());

        } catch (Exception e){
            respond.setStatusCode(500);
            respond.setMessage("Error Getting a user by id" + e.getMessage());

        }
        return respond;
    }

    @Override
    public Respond getMyInfo(String email) {
        Respond respond = new Respond();

        try {
            User user = userRepository.findByEmail(email).orElseThrow(()-> new OurException("User Not Found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);

            respond.setStatusCode(200);
            respond.setMessage("Successful");
            respond.setUser(userDTO);

        }catch (OurException e){
            respond.setStatusCode(404);
            respond.setMessage(e.getMessage());

        } catch (Exception e){
            respond.setStatusCode(500);
            respond.setMessage("Error Getting a user info" + e.getMessage());

        }
        return respond;
    }
}
