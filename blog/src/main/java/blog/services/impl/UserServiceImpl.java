package blog.services.impl;

import blog.entities.User;
import blog.entities.dtos.CreateUserDto;
import blog.entities.dtos.UpdateUserDto;
import blog.entities.dtos.UserResponseDto;
import blog.mappers.UserMapper;
import blog.repositories.UserRepository;
import blog.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<UserResponseDto> getAllUsers() {
        return List.of();
    }

    @Override
    public User getUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User with id: " + id + " not found"));
    }

    @Override
    public UserResponseDto createUser(CreateUserDto createUserDto) {
        User user = userMapper.toEntity(createUserDto);
        user.setPassword(passwordEncoder.encode(createUserDto.getPassword()));
        userRepository.save(user);
        return userMapper.toDto(user);
    }

    @Override
    public UserResponseDto updateUser(UUID id, UpdateUserDto updateUserDto) {
        return null;
    }

    @Override
    public void deleteUser(UUID id) {

    }
}
