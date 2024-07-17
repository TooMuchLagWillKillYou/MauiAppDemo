using MinimalAPI.Dtos;

namespace MinimalAPI.Data
{
    public interface IReservationRepository
    {
        Task<List<ReservationDto>> GetAll();
        Task<List<ReservationDto>> GetByDate(DateTime date);
        Task<ReservationDto> Get(int id);
        Task<ReservationDto> Add(ReservationDto reservation);
        Task<ReservationDto> Update(ReservationDto reservation);
        Task Delete(int id);
    }
}
