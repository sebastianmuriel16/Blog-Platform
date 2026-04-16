package blog.mappers;

import blog.entities.User;
import blog.entities.dtos.CreateUserDto;
import blog.entities.dtos.UpdateUserDto;
import blog.entities.dtos.UserResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(CreateUserDto createUserDto);

    UserResponseDto toDto(User user);

    // UpdateUserDto → User (para actualizar)
    // @MappingTarget le dice a MapStruct que actualice el objeto existente
    // en lugar de crear uno nuevo
    void updateEntity(UpdateUserDto dto, @MappingTarget User user);
}
