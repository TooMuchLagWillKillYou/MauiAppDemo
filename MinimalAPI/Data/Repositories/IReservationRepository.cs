using MinimalAPI.Dtos;

namespace MinimalAPI.Data.Repositories
{
    public interface IReservationRepository : IRepository<Reservation>
    {
        Task<List<ReservationDto>> GetByDate(DateTime date);
    }
}
