using Microsoft.EntityFrameworkCore;
using MinimalAPI.Dtos.Reservation;

namespace MinimalAPI.Data.Repositories;

public class ReservationRepository(ReservationDbContext ctx) : Repository<Reservation>(ctx), IReservationRepository
{
    public async Task<List<ReservationForListDto>> GetByDate(DateOnly date)
        => await Query()
            .Where(r => r.Day == date)
            .Select(r => new ReservationForListDto(r.Id, r.Name, r.Day, r.Hour, r.People, r.Table.Id, r.Notes, r.Status))
            .ToListAsync();

    public new async Task Delete(int id, CancellationToken token = default)
    {
        var e = await Get(id, token);
        e.IsDeleted = true;

        ctx.Entry(e).State = EntityState.Modified;
        await ctx.SaveChangesAsync(token);
    }
}

