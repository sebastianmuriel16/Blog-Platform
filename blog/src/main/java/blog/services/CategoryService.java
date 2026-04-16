package blog.services;

import blog.entities.Category;
import blog.entities.dtos.CategoryDto;
import blog.entities.dtos.CreateCategoryDto;

import java.util.List;
import java.util.UUID;

public interface CategoryService {
    List<CategoryDto> listCategories();
    CategoryDto createCategory(CreateCategoryDto createCategoryDto);
    CategoryDto getCategoryById(UUID categoryId);
    void deleteCategory(UUID categoryId);
}
