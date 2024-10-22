using System.ComponentModel.DataAnnotations;

namespace MinimalAPI.Data;

public class GreaterThanNow : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is null) return new ValidationResult("Value cannot be null.");
        
        var valueToDateTime = Convert.ToDateTime(value);
        var inputTimeSpan = new TimeSpan(valueToDateTime.Hour, valueToDateTime.Minute, 0);
        var now = new TimeSpan(DateTime.Now.Hour, DateTime.Now.Minute, 0);
     
        return inputTimeSpan >= now ?
            ValidationResult.Success :
            new ValidationResult("The value must be greater than or equal to the current time.");
    }
}