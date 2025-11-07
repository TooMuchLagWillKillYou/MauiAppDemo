namespace MinimalAPI.Data.Repositories;

public interface IMenuItemRepository : IRepository<MenuItem>
{
    IQueryable<MenuItem> QueryTemporal(DateTime from, DateTime to);
}