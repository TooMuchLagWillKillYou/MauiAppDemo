using Microsoft.EntityFrameworkCore;
using MinimalAPI.Common;

namespace MinimalAPI.Data.Repositories;

public class MenuItemCategoryRepository(ReservationDbContext context) : IMenuItemCategoryRepository
{
    public async Task<MenuItemCategory> GetCategory(int id) => await context.MenuItemCategories.FindAsync(id);
    public async Task<MenuItemCategory> GetCategory(MenuItemCategoryType type) => await GetCategory((int)type);
    public async Task<List<MenuItemCategory>> GetAll() => await context.MenuItemCategories.ToListAsync();
}