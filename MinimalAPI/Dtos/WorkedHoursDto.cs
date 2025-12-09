using System.ComponentModel.DataAnnotations;

namespace MinimalAPI.Dtos
{
    public record WorkedHoursDto(int Id,
        [Required] string Person,
        [Required] DateTime Day,
        [Required] float HoursAmount);
}
