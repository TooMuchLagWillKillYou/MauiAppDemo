namespace MinimalAPI.Data.Repositories;

public class MenuItemCategoryRepository(ReservationDbContext ctx) : Repository<MenuItemCategory>(ctx), IMenuItemCategoryRepository
{
}