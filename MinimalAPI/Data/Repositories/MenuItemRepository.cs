using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MinimalAPI.Data.Repositories;

public class MenuItemRepository(ReservationDbContext ctx) : Repository<MenuItem>(ctx), IMenuItemRepository
{
    public async Task<bool> Exists(Expression<Func<MenuItem, bool>> predicate)
        => await Query().AnyAsync(predicate);
}