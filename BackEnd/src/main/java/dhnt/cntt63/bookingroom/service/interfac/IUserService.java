package dhnt.cntt63.bookingroom.service.interfac;

import dhnt.cntt63.bookingroom.dto.LoginRequest;
import dhnt.cntt63.bookingroom.dto.Respond;
import dhnt.cntt63.bookingroom.entity.User;

public interface IUserService {

    Respond register(User user);
    Respond login(LoginRequest loginRequest);
    Respond getAllUsers();
    Respond getUserBookingHistory(String userId);
    Respond deleteUser(String userId);
    Respond getUserById(String userId);
    Respond getMyInfo(String email);
}
