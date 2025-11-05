namespace MinimalAPI.Data.Repositories;

public interface IRepository<TEntity>
{
    IQueryable<TEntity> Query();
    Task<TEntity> GetById(int id, CancellationToken token = default);
    Task<TEntity> Add(TEntity e, CancellationToken token = default);
    Task<bool> Exists(int id, CancellationToken token = default);
    Task<TEntity> Update(TEntity e, CancellationToken token = default);
    Task Delete(int id, CancellationToken token = default);
}