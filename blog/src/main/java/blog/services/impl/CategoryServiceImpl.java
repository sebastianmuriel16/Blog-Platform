package blog.services.impl;

import blog.entities.Category;
import blog.entities.dtos.CategoryDto;
import blog.entities.dtos.CreateCategoryDto;
import blog.exceptions.ResourceNotFoundException;
import blog.mappers.CategoryMapper;
import blog.repositories.CategoryRepository;
import blog.services.CategoryService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public List<CategoryDto> listCategories() {
        return categoryRepository.findAllWithPostCount()
                .stream()
                .map(categoryMapper::toDTO)
                .toList();
    }

    @Override
    @Transactional
    public CategoryDto createCategory(CreateCategoryDto createCategoryDto) {
        if(categoryRepository.existsByNameIgnoreCase(createCategoryDto.getName())){;
           throw new IllegalArgumentException("Category with the same name: " + createCategoryDto.getName()
                   +   " already exists");
        }
        Category category = categoryMapper.toEntity(createCategoryDto);
        Category savedCategory = categoryRepository.save(category);

        return categoryMapper.toDTO(savedCategory);
    }

    @Override
    public CategoryDto getCategoryById(UUID categoryId) {
        return categoryRepository.findById(categoryId)
                .map(categoryMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Category with id: " + categoryId + " not found"));
    }

    @Override
    public void deleteCategory(UUID categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(
                () -> new ResourceNotFoundException("Category with id: " + categoryId + " not found")
       );

       if(!category.getPosts().isEmpty()){
            throw new IllegalStateException("Cannot delete category with id: " + categoryId
                    + " because it has associated posts");
       }

       categoryRepository.delete(category);

    }
}