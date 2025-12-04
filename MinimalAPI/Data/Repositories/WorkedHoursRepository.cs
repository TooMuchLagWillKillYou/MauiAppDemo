using Microsoft.EntityFrameworkCore;
using MinimalAPI.Dtos;

namespace MinimalAPI.Data.Repositories
{
    public class WorkedHoursRepository(ReservationDbContext ctx) : Repository<WorkedHours>(ctx), IWorkedHoursRepository
    {
        public async Task<List<WorkedHoursDto>> GetByMonth(int year, int month)
            => await Query()
            .Where(x => x.Day.Year == year && x.Day.Month == month)
            .Select(x => new WorkedHoursDto(x.Id, x.Person, x.Day, x.HoursAmount))
            .ToListAsync();
    }
}
