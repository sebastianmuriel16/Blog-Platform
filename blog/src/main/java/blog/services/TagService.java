package blog.services;

import blog.entities.Tag;
import blog.entities.dtos.TagDto;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface TagService {

    List<TagDto> getAllTags();
    List<TagDto> createTags(Set<String> tagNames);
    TagDto getTagById(UUID tagId);
    void deleteTag(UUID tagId);
    List<Tag> getTagsByIds(Set<UUID> tagIds);

}
