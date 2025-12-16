using MinimalAPI.Data;
using MinimalAPI.Data.Repositories;
using MinimalAPI.ValidationAttributes;
using System.ComponentModel.DataAnnotations;

namespace MinimalAPI.Dtos.Reservation
{
    public record AddReservationDto([Required] string Name,
        [Required, GreaterThanOrEqualToToday] DateOnly Day,
        [Required] TimeOnly Hour,
        [Required, Minimum(1)] int People,
        int? TableId = null,
        string? Notes = null) : IValidatableObject
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

            // check that the hour is in the future if the day is today
            if (Day == DateOnly.FromDateTime(DateTime.Today))
            {
                var now = TimeOnly.FromDateTime(DateTime.Now);
                if (Hour < now)
                {
                    yield return new ValidationResult($"The time {Hour} has already passed for today.", new[] { nameof(Hour) });
                }
            }
        }
    }
}
