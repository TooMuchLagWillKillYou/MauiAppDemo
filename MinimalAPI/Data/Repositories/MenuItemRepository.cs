using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MinimalAPI.Data.Repositories;

public class MenuItemRepository(ReservationDbContext ctx) : Repository<MenuItem>(ctx), IMenuItemRepository
{
}