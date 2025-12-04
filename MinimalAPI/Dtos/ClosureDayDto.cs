using System.ComponentModel.DataAnnotations;

namespace MinimalAPI.Dtos
{
    public record ClosureDayDto(int Id,
        [Required] DateTime From, 
        DateTime To, 
        string? Reason);
    
}
