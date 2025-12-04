using Microsoft.EntityFrameworkCore;

namespace MinimalAPI.Data.Repositories;

public class MenuItemRepository(ReservationDbContext ctx) : Repository<MenuItem>(ctx), IMenuItemRepository
{
    public IQueryable<MenuItem> QueryTemporal(DateTime from , DateTime to)
        => ctx.MenuItems.TemporalBetween(from, to).Where(e => !e.IsDeleted);

    public new async Task Delete(int id, CancellationToken token = default)
    {
        var e = await Get(id, token);
        e.IsDeleted = true;

        ctx.Entry(e).State = EntityState.Modified;
        await ctx.SaveChangesAsync(token);
    }
}