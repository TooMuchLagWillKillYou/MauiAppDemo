namespace MinimalAPI.Dtos;

public record MenuItemForUploadDto (int Id, string Name, string? Ingredients,
    string? EnglishTranslation, string? GermanTranslation, decimal FirstPrice,
    decimal? SecondPrice, int? Page, int? Order, int CategoryId, int? SubCategoryId,
    IEnumerable<int> MenuIds);