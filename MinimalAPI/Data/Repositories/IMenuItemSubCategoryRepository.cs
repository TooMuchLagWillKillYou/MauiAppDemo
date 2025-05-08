namespace MinimalAPI.Data.Repositories;

public interface IMenuItemSubCategoryRepository
{
    Task<MenuItemSubCategory> GetByNameAsync(string name);
}