namespace MinimalAPI.Dtos;

public record MenuItemForListDto (int Id, string Name, string? Ingredients,
    string? EnglishTranslation, string? GermanTranslation, decimal FirstPrice,
    decimal? SecondPrice, int? Page, int? Order, MenuItemCategoryDto Category,
    MenuItemSubCategoryDto SubCategoryDto, IEnumerable<MenuDto> Menus);