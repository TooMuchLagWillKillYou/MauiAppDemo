using MinimalAPI.Common;
using MinimalAPI.Dtos;

namespace MinimalAPI.Data.Repositories;

public interface IMenuItemRepository : IRepository<MenuItem, int>
{
    Task<List<MenuItemForListDto>> GetByCategory(MenuItemCategoryType categoryType);
    Task<List<MenuItemForListDto>> GetByMenu(MenuType menuType);
    Task SoftDeleteAsync(int id);
}