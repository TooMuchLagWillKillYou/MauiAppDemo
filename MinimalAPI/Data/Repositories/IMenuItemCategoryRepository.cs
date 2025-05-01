using MinimalAPI.Common;

namespace MinimalAPI.Data.Repositories;

public interface IMenuItemCategoryRepository
{
    Task<MenuItemCategory> GetCategory(int id);
    Task<MenuItemCategory> GetCategory(MenuItemCategoryType type);
    Task<List<MenuItemCategory>> GetAll();
}