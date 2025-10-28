using Microsoft.EntityFrameworkCore;
using MinimalAPI.Common;

namespace MinimalAPI.Data.Repositories;

public class MenuItemCategoryRepository(ReservationDbContext context) : Repository<MenuItemCategory, int>(context), IMenuItemCategoryRepository
{
    public async Task<MenuItemCategory> Get(int id)
    {
        var result = await context.MenuItemCategories.FindAsync(id);
        if(result is null)
            throw new KeyNotFoundException($"Item of type {typeof(MenuItemCategory).FullName} with id {id} not found");
        return result;
    }
}