using Microsoft.EntityFrameworkCore;
using MinimalAPI.Dtos;
using MinimalAPI.Services;

namespace MinimalAPI.Data.Repositories
{
    public class TableRepository(ReservationDbContext ctx) : Repository<Table>(ctx), ITableRepository
    {
        public async Task<List<TableForMapDto>> GetByDate(DateTime date)
        {
            return await Query()
                .AsNoTracking()
                .Include(t => t.Reservations.Where(r => r.Hour.Date == date.Date))
                .AsSplitQuery()
                .Select(t => new TableForMapDto (t.Id, t.Description, TableStatusCalculator.Calculate(t, date)))  
                .ToListAsync();
        }
        public async Task<List<TableForMapDto>> QueryTemporal(DateTime from, DateTime to)
        {
            return await ctx.Tables
                .TemporalBetween(from, to)
                .Select(t => new TableForMapDto(t.Id, t.Description, TableStatusCalculator.Calculate(t, from)))
                .ToListAsync();
        }
    }
}
