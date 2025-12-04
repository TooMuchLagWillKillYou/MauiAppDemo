using System.ComponentModel.DataAnnotations;
using MinimalAPI.Common;
using MinimalAPI.Data;
using MinimalAPI.ValidationAttributes;

namespace MinimalAPI.Dtos
{
    public record ReservationDto(int Id, 
        [Required]string Name,
        [Required, GreaterThanNow] DateTime Hour,
        [Required, Minimum(1)] int People, 
        string? Table, 
        string? Notes,
        ReservationStatus Status);
}
