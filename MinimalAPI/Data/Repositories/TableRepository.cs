namespace MinimalAPI.Data.Repositories
{
    public class TableRepository(ReservationDbContext ctx) : Repository<Table>(ctx), ITableRepository
    {
    }
}
