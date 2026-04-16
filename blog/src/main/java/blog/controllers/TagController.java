package blog.controllers;

import blog.entities.dtos.CreateTagsRequest;
import blog.entities.dtos.TagDto;
import blog.services.TagService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/tags")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;

    @GetMapping
    public ResponseEntity<List<TagDto>> getAllTags() {
        List<TagDto> tags = tagService.getAllTags();
        return ResponseEntity.ok(tags);
    }

    @PostMapping
    public ResponseEntity<List<TagDto>> createTags(@Valid @RequestBody CreateTagsRequest createTagsRequest){
        List<TagDto> createdTags = tagService.createTags(createTagsRequest.getNames());
        return ResponseEntity.ok(createdTags);
    }

    @DeleteMapping("/{tagId}")
    public ResponseEntity<Void> deleteTag(@PathVariable UUID tagId){
        tagService.deleteTag(tagId);
        return ResponseEntity.noContent().build();
    }
}
