package dhnt.cntt63.bookingroom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BookingroomApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookingroomApplication.class, args);
	}

}
