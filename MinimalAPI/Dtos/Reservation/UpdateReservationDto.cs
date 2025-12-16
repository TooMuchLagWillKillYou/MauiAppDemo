using MinimalAPI.Data;
using MinimalAPI.Data.Repositories;
using MinimalAPI.ValidationAttributes;
using System.ComponentModel.DataAnnotations;

namespace MinimalAPI.Dtos.Reservation
{
    public record UpdateReservationDto(int Id,
        [Required] string Name,
        [Required, GreaterThanOrEqualToToday] DateOnly Day, 
        [Required] TimeOnly Hour, 
        [Required, Minimum(1)] int People,
        int? TableId,
        string? Notes) : IValidatableObject
    {
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            // check that the day is not within a closure period
            var repository = validationContext.GetService<IClosureDayRepository>();
            var closureDays = repository!.Query().ToList();

            foreach (var closureDay in closureDays)
            {
                if (Day >= closureDay.From && Day <= closureDay.To)
                {
                    yield return new ValidationResult($"The date {Day} falls within a closure period from {closureDay.From} to {closureDay.To}.", new[] { nameof(Hour) });
                }
            }
        }
    }
}