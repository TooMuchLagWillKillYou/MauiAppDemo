using System.ComponentModel.DataAnnotations;
using MinimalAPI.Common;

namespace MinimalAPI.Dtos;

public record PizzaDto(
    int Id,
    [property: Required]string Name,
    [property: Required]string Ingredients,
    [property: Required]decimal Price,
    [property: Required]PizzaType Type,
    int? Page,
    DateTime CreatedAt
    );