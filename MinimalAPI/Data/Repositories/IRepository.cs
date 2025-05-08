namespace MinimalAPI.Data.Repositories;

public interface IRepository<TEntity, TId>
{
    Task<IEnumerable<TEntity>> GetAllAsync();
    Task<TEntity> GetByIdAsync(TId id);
    Task<TEntity> AddAsync(TEntity e);
    Task<bool> ExistsAsync(TId id);
    Task<TEntity> UpdateAsync(TEntity e);
}