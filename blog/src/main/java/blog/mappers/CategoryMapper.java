package blog.mappers;

import blog.entities.Category;
import blog.entities.Post;
import blog.entities.PostStatus;
import blog.entities.dtos.CategoryDto;
import blog.entities.dtos.CreateCategoryDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CategoryMapper {

    Category toEntity(CreateCategoryDto createCategoryDto);

    Category toEntity(CategoryDto categoryDto);

    @Mapping(target = "postCount", source = "posts", qualifiedByName = "calculatePostCount")
    CategoryDto toDTO(Category category);

    @Named("calculatePostCount")
    default long calculatePostCount(List<Post> posts){
        if(null == posts){
            return 0;
        }
        return posts.stream()
                .filter(post -> PostStatus.PUBLISHED.equals(post.getStatus()))
                .count();
    }
}
