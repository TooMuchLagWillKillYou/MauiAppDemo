using MinimalAPI.Dtos;

namespace MinimalAPI.Data.Repositories
{
    public interface IClosureDayRepository : IRepository<ClosureDay>
    {
        Task<List<ClosureDayDto>> GetByMonth(int year, int month);
    }
}
