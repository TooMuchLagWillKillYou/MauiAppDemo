using MinimalAPI.Dtos;

namespace MinimalAPI.Data.Repositories
{
    public interface ITableRepository : IRepository<Table>
    {
        Task<List<TableForMapDto>> GetByDate(DateOnly date);
        Task<List<TableForMapDto>> QueryTemporal(DateOnly from, DateOnly to);
    }
}
