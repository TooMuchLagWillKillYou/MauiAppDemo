using System.Linq.Expressions;

namespace MinimalAPI.Data.Repositories;

public interface IRepository<TEntity> where TEntity : IEntity 
{
    IQueryable<TEntity> Query();
    Task<TEntity> Get(int id, CancellationToken token = default);
    Task<TEntity> Add(TEntity e, CancellationToken token = default);
    Task<bool> Exists(int id, CancellationToken token = default);
    Task<TEntity> Update(TEntity e, CancellationToken token = default);
    Task Delete(int id, CancellationToken token = default);
}