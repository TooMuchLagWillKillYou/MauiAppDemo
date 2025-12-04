namespace MinimalAPI.Data.Repositories
{
    public class WorkedHoursRepository(ReservationDbContext ctx) : Repository<WorkedHours>(ctx), IWorkedHoursRepository
    {
    }
}
