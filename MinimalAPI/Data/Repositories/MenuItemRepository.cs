using Microsoft.EntityFrameworkCore;
using MinimalAPI.Common;
using MinimalAPI.Dtos;

namespace MinimalAPI.Data.Repositories;

public class MenuItemRepository(ReservationDbContext context) : IMenuItemRepository
{
    public async Task<List<MenuItemDto>> GetByCategory(MenuItemCategoryType categoryType)
        => await context.MenuItems.Where(x => x.CategoryId == (int)categoryType)
            .Select(x => EntityToDto(x)).ToListAsync();
    public async Task<List<MenuItemDto>> GetByMenu(MenuType menuType)
        => await context.MenuItems.Where(x => x.Menus.Any(y => y.Id == (int)menuType))
            .Select(x => EntityToDto(x)).ToListAsync();
    public async Task<MenuItemDto> Add(MenuItemDto menuItem)
    {
        var entity = new MenuItem();
        DtoToEntity(menuItem, entity);
        context.MenuItems.Add(entity);
        await context.SaveChangesAsync();
        return EntityToDto(entity);
    }
    public async Task<MenuItemDto> Update(MenuItemDto menuItem)
    {
        var entity = await context.MenuItems.FindAsync(menuItem.Id);

        if (entity is null)
            throw new ArgumentException($"Couldn't find a menu item with id: {menuItem.Id}");

        DtoToEntity(menuItem, entity);
        context.Entry(entity).State = EntityState.Modified;
        await context.SaveChangesAsync();
        
        return EntityToDto(entity);
    }
    public async Task Delete(int id)
    {
        var entity = await context.MenuItems.FindAsync(id);
        
        if (entity is null)
            throw new ArgumentException($"Couldn't delete the menu item with id: {id}");

        entity.IsDeleted = true;
        context.Entry(entity).State = EntityState.Modified;
        await context.SaveChangesAsync();
    }
    private static void DtoToEntity(MenuItemDto d, MenuItem e)
    {
        e.Id = d.Id;
        e.Name = d.Name;
        e.Ingredients = d.Ingredients;
        e.EnglishTranslation = d.EnglishTranslation;
        e.GermanTranslation = d.GermanTranslation;
        e.FirstPrice = d.FirstPrice;
        e.SecondPrice = d.SecondPrice;
        e.Page = d.Page;
        e.Order = d.Order;
        e.IsDeleted = d.IsDeleted;
        e.CreatedAt = d.CreatedAt;
        e.UpdatedAt = d.UpdatedAt;
        e.CategoryId = d.Category.Id;
        e.Category = new MenuItemCategory()
        {
            Id = d.Category.Id,
            Name = d.Category.Name
        };
        e.SubCategoryId = d.SubCategory?.Id;
        e.SubCategory =  new MenuItemSubCategory()
        {
            Id = d.Category.Id,
            Name = d.Category.Name
        };
        e.Menus = d.Menus.Select(x => new Menu
        {
            Id = x.Id,
            Name = x.Name,
        }).ToList();
    }
    private static MenuItemDto EntityToDto(MenuItem e)
    {
        return new MenuItemDto(
            e.Id,
            e.Name,
            e.Ingredients,
            e.EnglishTranslation,
            e.GermanTranslation,
            e.FirstPrice,
            e.SecondPrice,
            e.Page,
            e.Order,
            e.IsDeleted,
            e.CreatedAt,
            e.UpdatedAt,
            new MenuItemCategoryDto(e.Category.Id, e.Category.Name),
            new MenuItemSubCategoryDto(e.SubCategory.Id, e.SubCategory.Name),
            e.Menus.Select(x => new MenuDto(x.Id, x.Name)).ToList());
    }
}