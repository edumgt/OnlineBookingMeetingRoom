package dhnt.cntt63.bookingroom.utils;

import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

@Service
public class JWTUtils {
    private static final long EXPIRATION_TIME = 1000*600*24*7; //expiration in 7 days millisec equivalent
    private final SecretKey Key;
    public JWTUtils(){
        String secretKey = "cf1e731c-3a82-4f42-8e64-df66662d3b3e";
    }
}
