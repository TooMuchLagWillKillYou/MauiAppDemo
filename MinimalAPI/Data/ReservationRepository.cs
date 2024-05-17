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

        public async Task<ReservationDto> Get(int id)
        {
            var entity = await _context.Reservations.SingleOrDefaultAsync(r => r.Id == id);

            if (entity == null)
                throw new ArgumentException($"Could not get reservation {id}");

            return EntityToDto(entity);
        }

        public async Task<ReservationDto> Add(ReservationDto reservation)
        {
            var entity = new ReservationEntity();
            DtoToEntity(reservation, entity);
            _context.Reservations.Add(entity);
            await _context.SaveChangesAsync();

            return EntityToDto(entity);
        }

        public async Task<ReservationDto> Update(ReservationDto reservation)
        {
            var entity = await _context.Reservations.FindAsync(reservation.Id);

            if (entity == null)
                throw new ArgumentException($"Could not update reservation {reservation.Id}");

            DtoToEntity(reservation, entity);
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return EntityToDto(entity);
        }

        public async Task Delete(int id)
        {
            var entity = await _context.Reservations.FindAsync(id);

            if (entity == null)
                throw new ArgumentException($"Could not delete reservation {id}");

            _context.Reservations.Remove(entity);
            await _context.SaveChangesAsync();
        }

        private static void DtoToEntity(ReservationDto d, ReservationEntity e)
        {
            e.Id = d.Id;
            e.Name = d.Name;
            e.Hour = d.Hour;
            e.People = d.People;
            e.Table = d.Table;
            e.Notes = d.Notes;
        }

        private static ReservationDto EntityToDto(ReservationEntity e)
        {
            return new ReservationDto(e.Id, e.Name, e.Hour, e.People, e.Table, e.Notes);
        }
    }
}
