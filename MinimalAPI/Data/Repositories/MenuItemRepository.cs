using Microsoft.EntityFrameworkCore;
using MinimalAPI.Common;
using MinimalAPI.Dtos;

namespace MinimalAPI.Data.Repositories;

public class MenuItemRepository(ReservationDbContext context) : Repository<MenuItem, int>(context), IMenuItemRepository
{
    public async Task<List<MenuItemForListDto>> GetByCategory(MenuItemCategoryType categoryType)
        => await context.MenuItems.Where(x => x.CategoryId == (int)categoryType)
            .Select(x => x.ToListDto()).ToListAsync();
    public async Task<List<MenuItemForListDto>> GetByMenu(MenuType menuType)
        => await context.MenuItems.Where(x => x.Menus.Any(y => y.Id == (int)menuType))
            .Select(x => x.ToListDto()).ToListAsync();
    
    public async Task SoftDeleteAsync(int id)
    {
        var entity = await context.MenuItems.FindAsync(id);
        
        if (entity is null) throw new KeyNotFoundException($"Item of type {typeof(MenuItem).FullName} with id {id} not found");

        entity.IsDeleted = true;
        context.Entry(entity).State = EntityState.Modified;
        await context.SaveChangesAsync();
    }
}