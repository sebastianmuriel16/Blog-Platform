package blog.services.impl;

import blog.entities.*;
import blog.entities.dtos.*;
import blog.exceptions.ForbiddenException;
import blog.exceptions.ResourceNotFoundException;
import blog.mappers.CategoryMapper;
import blog.mappers.PostMapper;
import blog.mappers.TagMapper;
import blog.repositories.PostRepository;
import blog.services.CategoryService;
import blog.services.PostService;
import blog.services.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final TagService tagService;
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;
    private final TagMapper tagMapper;
    private final PostMapper postMapper;

    private static final int WORDS_PER_MINUTE = 200;
    private static final int MIN_READING_TIME = 1;

    @Override
    @Transactional(readOnly = true)
    public List<PostDto> getAllPosts(UUID categoryId, UUID tagId) {
        if(categoryId != null && tagId != null){
            CategoryDto categoryDto = categoryService.getCategoryById(categoryId);
            Category category = categoryMapper.toEntity(categoryDto);
            TagDto tagDto = tagService.getTagById(tagId);
            Tag tag = tagMapper.toEntity(tagDto);

             postRepository.findAllByStatusAndCategoryAndTagsContaining(
                    PostStatus.PUBLISHED,
                    category,
                    tag
            ).stream()
                    .map(postMapper::toDTO)
                    .toList();
        }

        if(categoryId != null){
            CategoryDto categoryDto = categoryService.getCategoryById(categoryId);
            Category category = categoryMapper.toEntity(categoryDto);

             postRepository.findAllByStatusAndCategory(
                    PostStatus.PUBLISHED,
                    category
            ).stream()
                    .map(postMapper::toDTO)
                    .toList();
        }

        if(tagId != null){
            TagDto tagDto = tagService.getTagById(tagId);
            Tag tag = tagMapper.toEntity(tagDto);

             return postRepository.findAllByStatusAndTagsContaining(
                    PostStatus.PUBLISHED,
                    tag
            ).stream()
                    .map(postMapper::toDTO)
                    .toList();
        }

        return postRepository.findAllByStatus(PostStatus.PUBLISHED).stream()
                .map(postMapper::toDTO)
                .toList();

    }

    @Override
    public List<PostDto> getDraftPosts(User user) {
        return postRepository.findAllByAuthorAndStatus(user, PostStatus.DRAFT)
                .stream()
                .map(postMapper::toDTO)
                .toList();

    }

    @Override
    public PostDto getPostById(UUID postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));
        return postMapper.toDTO(post);
    }

    @Override
    public PostDto createPost(User user, CreatePostRequestDto createPostRequestDto) {
        Post newPost = new Post();
        newPost.setTitle(createPostRequestDto.getTitle());
        newPost.setContent(createPostRequestDto.getContent());
        newPost.setAuthor(user);
        newPost.setStatus(createPostRequestDto.getStatus());
        newPost.setReadTime(calculateReadingTime(createPostRequestDto.getContent()));

        Category category = categoryMapper.toEntity(categoryService.getCategoryById(createPostRequestDto.getCategoryId()));
        newPost.setCategory(category);

        Set<UUID> tagIds = createPostRequestDto.getTagIds();
        List<Tag> tags = tagService.getTagsByIds(tagIds);
        newPost.setTags(new HashSet<>(tags));

        return postMapper.toDTO(postRepository.save(newPost));
    }

    @Override
    @Transactional
    public PostDto updatePost(UUID postId, UpdatePostRequestDto updatePostRequestDto, UUID userId) {
        Post existingPost = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        if(!existingPost.getAuthor().getId().equals(userId)){
            throw new ForbiddenException("You are not authorized to update this post");
        }
        existingPost.setTitle(updatePostRequestDto.getTitle());
        existingPost.setContent(updatePostRequestDto.getContent());
        existingPost.setStatus(updatePostRequestDto.getStatus());
        existingPost.setReadTime(calculateReadingTime(updatePostRequestDto.getContent()));

        UUID updatePostRequestCategoryId = updatePostRequestDto.getCategoryId();
        if(!existingPost.getCategory().getId().equals(updatePostRequestCategoryId)){
            CategoryDto newCategory = categoryService.getCategoryById(updatePostRequestCategoryId);
            existingPost.setCategory(categoryMapper.toEntity(newCategory));
        }

        Set<UUID> existingTagIds = existingPost.getTags().stream()
                .map(Tag::getId)
                .collect(Collectors.toSet());
        Set<UUID> updatePostRequestTagIds = updatePostRequestDto.getTagIds();

        if(!existingTagIds.equals(updatePostRequestTagIds)){
            List<Tag> newTags = tagService.getTagsByIds(updatePostRequestTagIds);
            existingPost.setTags(new HashSet<>(newTags));
        }

        return postMapper.toDTO(postRepository.save(existingPost));
    }

    @Override
    public void deletePost(UUID postId) {
        Post existingPost = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));
        postRepository.delete(existingPost);
    }

    private Integer calculateReadingTime(String content){
        if(content == null || content.isEmpty()){
            return MIN_READING_TIME;
        }

        int wordCount = content.trim().split("[\\s\\p{Punct}]+").length;
        int readingTime = (int) Math.ceil((double) wordCount / WORDS_PER_MINUTE);
        return Math.max(readingTime, MIN_READING_TIME);
    }

}
