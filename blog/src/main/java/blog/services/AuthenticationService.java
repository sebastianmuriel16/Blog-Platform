package blog.services;

import blog.entities.dtos.CreateUserDto;
import org.springframework.security.core.userdetails.UserDetails;

public interface AuthenticationService {
    UserDetails authenticate(String email, String password);
    UserDetails signup(CreateUserDto createUserDto);
}
