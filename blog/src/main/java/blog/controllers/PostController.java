package blog.controllers;

import blog.entities.User;
import blog.entities.dtos.CreatePostRequestDto;
import blog.entities.dtos.PostDto;
import blog.entities.dtos.UpdatePostRequestDto;
import blog.entities.dtos.UpdateUserDto;
import blog.mappers.PostMapper;
import blog.services.PostService;
import blog.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final UserService userService;
    private final PostMapper postMapper;

    @GetMapping
    public ResponseEntity<List<PostDto>> getAllPosts(
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false) UUID tagId)
    {
        List<PostDto> posts = postService.getAllPosts(categoryId, tagId);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostDto> getPostById(@PathVariable UUID postId){
        PostDto post = postService.getPostById(postId);
        return ResponseEntity.ok(post);
    }

    @GetMapping("/drafts")
    public ResponseEntity<List<PostDto>> getDraftPosts(@RequestAttribute UUID userId){
        User LoggedInUser = userService.getUserById(userId);
        List<PostDto> posts = postService.getDraftPosts(LoggedInUser);
        return ResponseEntity.ok(posts);
    }

    @PostMapping
    public ResponseEntity<PostDto> createPost(@Valid @RequestBody CreatePostRequestDto createPostRequestDto,
                                              @RequestAttribute UUID userId){
        User loggedInUser = userService.getUserById(userId);
        PostDto createdPost = postService.createPost(loggedInUser, createPostRequestDto);
        return ResponseEntity.ok(createdPost);
    }

    @PutMapping("/{postId}")
    public ResponseEntity<PostDto> updatePost(@PathVariable UUID postId,
                                              @Valid @RequestBody UpdatePostRequestDto updatePostRequestDto,
                                              @RequestAttribute UUID userId)

    {
        PostDto updatedPost = postService.updatePost(postId, updatePostRequestDto, userId);
        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable UUID postId){
        postService.deletePost(postId);
        return ResponseEntity.noContent().build();
    }

}
