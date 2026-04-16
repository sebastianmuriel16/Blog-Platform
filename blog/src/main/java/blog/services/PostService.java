package blog.services;

import blog.entities.User;
import blog.entities.dtos.CreatePostRequestDto;
import blog.entities.dtos.PostDto;
import blog.entities.dtos.UpdatePostRequestDto;

import java.util.List;
import java.util.UUID;

public interface PostService {

    List<PostDto> getAllPosts(UUID categoryId, UUID tagId);
    List<PostDto> getDraftPosts(User user);
    PostDto getPostById(UUID postId);
    PostDto createPost(User user, CreatePostRequestDto createPostRequestDto);
    PostDto updatePost(UUID postId, UpdatePostRequestDto updatePostRequestDto, UUID userId);
    void deletePost(UUID postId);
}
