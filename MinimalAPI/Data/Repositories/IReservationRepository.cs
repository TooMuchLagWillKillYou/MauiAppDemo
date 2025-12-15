using MinimalAPI.Dtos.Reservation;

namespace MinimalAPI.Data.Repositories
{
    public interface IReservationRepository : IRepository<Reservation>
    {
        Task<List<ReservationForListDto>> GetByDate(DateOnly date);
    }
}
