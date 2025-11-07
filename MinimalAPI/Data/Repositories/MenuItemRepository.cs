using Microsoft.EntityFrameworkCore;

namespace MinimalAPI.Data.Repositories;

public class MenuItemRepository(ReservationDbContext ctx) : Repository<MenuItem>(ctx), IMenuItemRepository
{
    public IQueryable<MenuItem> QueryTemporal(DateTime from , DateTime to)
        => ctx.MenuItems.TemporalBetween(from, to).Where(e => !e.IsDeleted);
}