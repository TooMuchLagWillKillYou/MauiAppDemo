using MinimalAPI.Data;
using MinimalAPI.Data.Repositories;
using MinimalAPI.ValidationAttributes;
using System.ComponentModel.DataAnnotations;

namespace MinimalAPI.Dtos.Reservation
{
    public record ReservationDto(int Id,
        [Required] string Name,
        [Required, GreaterThanNow] DateTime Hour,
        [Required, Minimum(1)] int People,
        int? TableId,
        string? Notes) : IValidatableObject
    {
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var repository = validationContext.GetService<IClosureDayRepository>();
            var date = DateOnly.FromDateTime(Hour);
            var closureDays = repository!.Query().ToList();

            foreach (var closureDay in closureDays)
            {
                if (date >= DateOnly.FromDateTime(closureDay.From) && date <= DateOnly.FromDateTime(closureDay.To))
                {
                    yield return new ValidationResult($"The date {date} falls within a closure period from {DateOnly.FromDateTime(closureDay.From)} to {DateOnly.FromDateTime(closureDay.To)}.", new[] { nameof(Hour) });
                }
            }
        }
    }
}
