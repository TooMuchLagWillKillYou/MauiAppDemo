using System.ComponentModel.DataAnnotations;

namespace MinimalAPI.Dtos;

public record MenuDto(int Id, [Required]string Name);