using System.ComponentModel.DataAnnotations;
using MinimalAPI.Common;

namespace MinimalAPI.Dtos;

public record PizzaDto(
    int Id,
    [Required]string Name,
    [Required]string Ingredients,
    [Required]decimal Price,
    [Required]PizzaCategory Category,
    int? Page,
    DateTime CreatedAt
    );