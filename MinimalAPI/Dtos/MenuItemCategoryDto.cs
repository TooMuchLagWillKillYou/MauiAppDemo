using System.ComponentModel.DataAnnotations;

namespace MinimalAPI.Dtos;

public record MenuItemCategoryDto(int Id, [Required]string Name);