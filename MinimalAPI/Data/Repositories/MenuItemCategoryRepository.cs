using Microsoft.EntityFrameworkCore;
using MinimalAPI.Common;

namespace MinimalAPI.Data.Repositories;

public class MenuItemCategoryRepository(ReservationDbContext context) : Repository<MenuItemCategory, int>(context), IMenuItemCategoryRepository
{
    public async Task<MenuItemCategory> GetByNameAsync(string name)
    {
        var result = await context.MenuItemCategories.FirstOrDefaultAsync(x => x.Name == name);
        if(result is null)
            throw new KeyNotFoundException($"Item of type {typeof(MenuItemCategory).FullName} with name {name} not found");
        return result;
    }
}