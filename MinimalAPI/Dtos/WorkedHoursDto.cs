using System.ComponentModel.DataAnnotations;

namespace MinimalAPI.Dtos
{
    public record WorkedHoursDto(int id,
        [Required] string Person,
        [Required] DateTime Day,
        [Required] float HoursAmount);
}
