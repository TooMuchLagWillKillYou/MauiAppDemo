using System.ComponentModel.DataAnnotations;

namespace MinimalAPI.ValidationAttributes;

public class GreaterThanOrEqualToToday : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is null) return new ValidationResult("Value cannot be null.");

        return ((DateOnly)value) >= DateOnly.FromDateTime(DateTime.Now.Date) ?
            ValidationResult.Success :
            new ValidationResult("The value must be greater than or equal to the current date."); 
    }
}