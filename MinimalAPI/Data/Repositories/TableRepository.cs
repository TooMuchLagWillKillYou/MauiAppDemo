using Microsoft.EntityFrameworkCore;
using MinimalAPI.Dtos;
using MinimalAPI.Services;

namespace MinimalAPI.Data.Repositories
{
    public class TableRepository(ReservationDbContext ctx) : Repository<Table>(ctx), ITableRepository
    {
        public async Task<List<TableForMapDto>> GetByDate(DateOnly date)
        {
            return await Query()
                .AsNoTracking()
                .Include(t => t.Reservations.Where(r => r.Day == date))
                .AsSplitQuery()
                .Select(t => new TableForMapDto (t.Id, t.Description, TableStatusCalculator.Calculate(t, date)))  
                .ToListAsync();
        }
        public async Task<List<TableForMapDto>> QueryTemporal(DateOnly from, DateOnly to)
        {
            var fromDateTime = from.ToDateTime(TimeOnly.MinValue);
            var toDateTime = to.ToDateTime(TimeOnly.MaxValue);

            return await ctx.Tables
                .TemporalBetween(fromDateTime, toDateTime)
                .Select(t => new TableForMapDto(t.Id, t.Description, TableStatusCalculator.Calculate(t, from)))
                .ToListAsync();
        }
    }
}
