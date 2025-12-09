using MinimalAPI.Dtos;

namespace MinimalAPI.Data.Repositories
{
    public interface ITableRepository : IRepository<Table>
    {
        Task<List<TableForMapDto>> GetByDate(DateTime date);
        Task<List<TableForMapDto>> QueryTemporal(DateTime from, DateTime to);
    }
}
