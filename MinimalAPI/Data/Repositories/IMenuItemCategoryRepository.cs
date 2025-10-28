namespace MinimalAPI.Data.Repositories;

public interface IMenuItemCategoryRepository
{
    Task<MenuItemCategory> Get(int id);
}