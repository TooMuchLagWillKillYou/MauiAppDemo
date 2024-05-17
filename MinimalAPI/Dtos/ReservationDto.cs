using System.ComponentModel.DataAnnotations;

namespace MinimalAPI.Dtos
{
    public record ReservationDto(int Id, 
        [property: Required]string Name,
        [property: Required] DateTime Hour,
        [property: Required] int People, 
        string? Table, 
        string? Notes);
}
