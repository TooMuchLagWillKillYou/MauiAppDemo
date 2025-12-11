using Microsoft.EntityFrameworkCore;
using MinimalAPI.Dtos;

namespace MinimalAPI.Data.Repositories
{
    public class ClosureDayRepository(ReservationDbContext ctx) : Repository<ClosureDay>(ctx), IClosureDayRepository
    {
        public async Task<List<ClosureDayDto>> GetByMonth(int year, int month)
        {
            var start = DateOnly.FromDateTime(new DateTime(year, month, 1));
            var next = start.AddMonths(1);

            return await Query()
                .Where(x => x.From < next && x.To >= start)
                .Select(x => new ClosureDayDto(x.Id, x.From, x.To, x.Reason))
                .ToListAsync();
        }
        public async Task<List<ClosureDayDto>> GetRange(DateOnly from, DateOnly to)
            => await Query()
            .Where(x => x.From < to && x.To >= from)
            .Select(x => new ClosureDayDto(x.Id, x.From, x.To, x.Reason))
            .ToListAsync();
    }
}
