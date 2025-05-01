using System.ComponentModel.DataAnnotations;

namespace MinimalAPI.Dtos;

public record MenuItemSubCategoryDto(int Id, [Required]string Name);