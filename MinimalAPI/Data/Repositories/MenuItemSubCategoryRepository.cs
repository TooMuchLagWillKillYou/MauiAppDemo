using Microsoft.EntityFrameworkCore;

namespace MinimalAPI.Data.Repositories;

public class MenuItemSubCategoryRepository(ReservationDbContext context) : Repository<MenuItemSubCategory, int>(context),
    IMenuItemSubCategoryRepository
{
    public async Task<MenuItemSubCategory> GetByNameAsync(string name)
    {
        var result = await context.MenuItemSubCategories.FirstOrDefaultAsync(x => x.Name == name);
        if(result is null)
            throw new KeyNotFoundException($"Item of type {typeof(MenuItemSubCategory).FullName} with name {name} not found");
        return result;
    }
}