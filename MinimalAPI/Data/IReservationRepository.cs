using MinimalAPI.Dtos;

namespace MinimalAPI.Data
{
    public interface IReservationRepository
    {
        Task<List<ReservationDto>> GetAll();
    }
}
