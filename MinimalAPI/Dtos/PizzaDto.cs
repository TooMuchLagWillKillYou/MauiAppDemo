using System.ComponentModel.DataAnnotations;
using MinimalAPI.Common;

namespace MinimalAPI.Dtos;

public record PizzaDto(
    int Id,
    [Required]string Name,
    [Required]string Ingredients,
    string EnglishTranslation,
    string GermanTranslation,
    [Required]decimal Price,
    [Required,EnumDataType(typeof(PizzaCategory))]PizzaCategory Category,
    int? Page,
    DateTime CreatedAt
    );