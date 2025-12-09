using MinimalAPI.Dtos;

namespace MinimalAPI.Data.Repositories
{
    public interface ITableRepository : IRepository<Table>
    {
        Task<List<TableForListDto>> GetByDate(DateTime date);
    }
}
