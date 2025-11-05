using Microsoft.EntityFrameworkCore;

namespace MinimalAPI.Data.Repositories;

public class MenuItemRepository(ReservationDbContext ctx) : Repository<MenuItem>(ctx), IMenuItemRepository
{
}