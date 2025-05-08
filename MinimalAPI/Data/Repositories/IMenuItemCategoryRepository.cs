using MinimalAPI.Common;

namespace MinimalAPI.Data.Repositories;

public interface IMenuItemCategoryRepository
{
    Task<MenuItemCategory> GetByNameAsync(string name);
}