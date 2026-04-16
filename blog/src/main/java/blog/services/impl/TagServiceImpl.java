package blog.services.impl;

import blog.entities.Tag;
import blog.entities.dtos.TagDto;
import blog.exceptions.ResourceNotFoundException;
import blog.mappers.TagMapper;
import blog.repositories.TagRepository;
import blog.services.TagService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;
    private final TagMapper tagMapper;

    @Override
    public List<TagDto> getAllTags() {
    return tagRepository.findAllWithPostCount()
            .stream()
            .map(tagMapper::toTagDTO)
            .toList();
    }

    @Transactional
    @Override
    public List<TagDto> createTags(Set<String> tagNames) {
        List<Tag> existingTags = tagRepository.findByNameIn(tagNames);

        Set<String> existingTagNames = existingTags.stream()
                .map(Tag::getName)
                .collect(Collectors.toSet());

        List<Tag> newTags = tagNames.stream()
                .filter(name -> !existingTagNames.contains(name))
                .map(name -> Tag.builder().name(name).posts(new HashSet<>())
                .build())
                .toList();

        List<Tag> savedTags = new ArrayList<>();
        if(!newTags.isEmpty()){
            savedTags = tagRepository.saveAll(newTags);
        }

        savedTags.addAll(existingTags);

        return savedTags.stream()
                .map(tagMapper::toTagDTO)
                .toList();

    }

    @Override
    public TagDto getTagById(UUID tagId) {
        return tagRepository.findById(tagId)
                .map(tagMapper::toTagDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Tag not found with id: " + tagId));
    }

    @Transactional
    @Override
    public void deleteTag(UUID tagId) {
        tagRepository.findById(tagId).ifPresent(tag -> {
            if(!tag.getPosts().isEmpty()){
                throw new IllegalStateException("Cannot delete tag with associated posts");
            }
            tagRepository.deleteById(tagId);
        });

    }

    @Override
    public List<Tag> getTagsByIds(Set<UUID> tagIds) {
        List<Tag> foundTags = tagRepository.findAllById(tagIds);
        if(foundTags.size() != tagIds.size()){
            throw new ResourceNotFoundException("Not all specified tags were found");
        }
        return foundTags;
    }
}
