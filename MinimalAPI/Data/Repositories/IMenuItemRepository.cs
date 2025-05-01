using MinimalAPI.Common;
using MinimalAPI.Dtos;

namespace MinimalAPI.Data.Repositories;

public interface IMenuItemRepository
{
    Task<List<MenuItemDto>> GetByCategory(MenuItemCategoryType categoryType);
    Task<List<MenuItemDto>> GetByMenu(MenuType menuType);
    Task<MenuItemDto> Add(MenuItemDto menuItem);
    Task<MenuItemDto> Update(MenuItemDto menuItem);
    Task Delete(int id);
}