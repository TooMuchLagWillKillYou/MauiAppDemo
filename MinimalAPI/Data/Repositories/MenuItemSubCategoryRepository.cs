using Microsoft.EntityFrameworkCore;

namespace MinimalAPI.Data.Repositories;

public class MenuItemSubCategoryRepository(ReservationDbContext ctx) : Repository<MenuItemSubCategory>(ctx), IMenuItemSubCategoryRepository
{
}