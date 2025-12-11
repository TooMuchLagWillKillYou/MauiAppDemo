using System.ComponentModel.DataAnnotations;

namespace MinimalAPI.Dtos
{
    public record ClosureDayDto(int Id,
        [Required] DateOnly From, 
        DateOnly To, 
        string? Reason);
    
}
