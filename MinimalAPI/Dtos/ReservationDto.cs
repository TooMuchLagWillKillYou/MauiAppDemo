using System.ComponentModel.DataAnnotations;
using MinimalAPI.Data;

namespace MinimalAPI.Dtos
{
    public record ReservationDto(int Id, 
        [property: Required]string Name,
        [property: Required] DateTime Hour,
        [property: Required, Minimum(1)] int People, 
        string? Table, 
        string? Notes);
}
