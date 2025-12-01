using Microsoft.EntityFrameworkCore;
using MinimalAPI.Dtos;

namespace MinimalAPI.Data.Repositories;

public class ReservationRepository(ReservationDbContext ctx) : Repository<Reservation>(ctx), IReservationRepository
{
    public async Task<List<ReservationDto>> GetByDate(DateTime date)
        => await Query().Where(r => DateOnly.FromDateTime(r.Hour) == DateOnly.FromDateTime(date))
            .Select(r => new ReservationDto(r.Id, r.Name, r.Hour, r.People, r.Table, r.Notes)).ToListAsync();
}

