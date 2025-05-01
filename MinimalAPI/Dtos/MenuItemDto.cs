using System.ComponentModel.DataAnnotations;
using MinimalAPI.Data;

namespace MinimalAPI.Dtos;

public record MenuItemDto(
    int Id,
    [Required]string Name,
    string? Ingredients,
    string? EnglishTranslation,
    string? GermanTranslation,
    [Required]decimal FirstPrice,
    decimal? SecondPrice,
    int? Page,
    int? Order,
    bool IsDeleted,
    DateTime CreatedAt,
    DateTime? UpdatedAt,
    [Required]MenuItemCategoryDto Category,
    MenuItemSubCategoryDto? SubCategory,
    [Required]IList<MenuDto> Menus);