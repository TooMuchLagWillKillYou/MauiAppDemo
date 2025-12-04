using MinimalAPI.Dtos;

namespace MinimalAPI.Data.Repositories
{
    public interface IWorkedHoursRepository : IRepository<WorkedHours>
    {
        Task<List<WorkedHoursDto>> GetByMonth(int year, int month);
    }
}
