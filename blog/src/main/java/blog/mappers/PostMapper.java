package blog.mappers;

import blog.entities.Post;
import blog.entities.dtos.CreatePostRequestDto;
import blog.entities.dtos.PostDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PostMapper {

    @Mapping(target = "author", source = "author")
    @Mapping(target = "category", source = "category")
    @Mapping(target = "tags", source = "tags")
    @Mapping(target = "status", source = "status")
    @Mapping(target = "readingTime", source = "readTime")
    PostDto toDTO(Post post);
}
