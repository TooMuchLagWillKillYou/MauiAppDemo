using MinimalAPI.Dtos;

namespace MinimalAPI.Data.Repositories;

public class MenuRepository(ReservationDbContext ctx) : Repository<Menu>(ctx), IMenuRepository
{
}