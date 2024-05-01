using Microsoft.EntityFrameworkCore;
using MinimalAPI.Dtos;

namespace MinimalAPI.Data
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly ReservationDbContext _context;

        public ReservationRepository(ReservationDbContext context)
        {
            _context = context;
        }

        public async Task<List<ReservationDto>> GetAll()
        {
            return await _context.Reservations.Select(r =>
                new ReservationDto(r.Id, r.Name, r.Hour, r.People, r.Table, r.Notes)).ToListAsync();
        }
    }
}
