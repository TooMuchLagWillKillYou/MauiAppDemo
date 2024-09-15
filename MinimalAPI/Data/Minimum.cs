using System.ComponentModel.DataAnnotations;

namespace MinimalAPI.Data
{
    public class Minimum(int minimum) : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is null) return new ValidationResult("Value cannot be null.");
            return (int)value > 0 ?
                ValidationResult.Success : 
                new ValidationResult($"Value must be greater than or equal to {minimum}.");
        }
    }
}