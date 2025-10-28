using MinimalAPI.Data;

namespace MinimalAPI.Dtos;

public static class MenuItemMapper
{
    public static MenuItemForUploadDto ToUploadDto(this MenuItem e)
        => new MenuItemForUploadDto(
                e.Id, e.Name, e.Ingredients, e.EnglishTranslation, e.GermanTranslation,
            e.FirstPrice, e.SecondPrice, e.Page, e.Order, e.CategoryId, e.SubCategoryId, e.Menus.Select(x => x.Id));
    
    public static MenuItemForListDto ToListDto(this MenuItem e)
        => new MenuItemForListDto(e.Id, e.Name, e.Ingredients, e.EnglishTranslation, e.GermanTranslation, e.FirstPrice,
            e.SecondPrice, e.Page, e.Order, new MenuItemCategoryDto(e.Category.Id, e.Category.Name), 
            new MenuItemSubCategoryDto(e.SubCategory.Id, e.SubCategory.Name), e.Menus.Select(x => new MenuDto(x.Id, x.Name)));
    
    public static MenuItem ToEntity(this MenuItemForUploadDto d)
        => new MenuItem
        {
            Id = d.Id,
            Name = d.Name,
            Ingredients = d.Ingredients,
            EnglishTranslation = d.EnglishTranslation,
            GermanTranslation = d.GermanTranslation,
            FirstPrice = d.FirstPrice,
            SecondPrice = d.SecondPrice,
            Page = d.Page,
            Order = d.Order,
            CategoryId = d.CategoryId,
            SubCategoryId = d.SubCategoryId,
            
        };

    public static MenuItem ToEntity(this MenuItemForListDto d)
        => new MenuItem
        {
            Id = d.Id,
            Name = d.Name,
            Ingredients = d.Ingredients,
            EnglishTranslation = d.EnglishTranslation,
            GermanTranslation = d.GermanTranslation,
            FirstPrice = d.FirstPrice,
            SecondPrice = d.SecondPrice,
            Page = d.Page,
            Order = d.Order,
            CategoryId = d.Category.Id,
            Category = new MenuItemCategory {Id = d.Category.Id, Name = d.Category.Name},
            SubCategoryId = d.SubCategoryDto.Id,
            SubCategory = new MenuItemSubCategory {Id = d.SubCategoryDto.Id, Name = d.SubCategoryDto.Name},
            Menus = d.Menus.Select(x => new Menu {Id = x.Id, Name = x.Name}).ToList()
        };

}