package blog.services;

import blog.entities.User;
import blog.entities.dtos.CreateUserDto;
import blog.entities.dtos.UpdateUserDto;
import blog.entities.dtos.UserResponseDto;

import java.util.List;
import java.util.UUID;

public interface UserService {

    List<UserResponseDto> getAllUsers();

    User getUserById(UUID id);

    UserResponseDto createUser(CreateUserDto createUserDto);

    UserResponseDto updateUser(UUID id, UpdateUserDto updateUserDto);

    void deleteUser(UUID id);


}
