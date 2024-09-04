using System.ComponentModel.DataAnnotations;

namespace MinimalAPI.Dtos
{
    public record ReservationDto(int Id, 
        [property: Required]string Name,
        [property: Required] DateTime Hour,
        [property: Required, Range(1, 100)] int People, 
        string? Table, 
        string? Notes);
}
