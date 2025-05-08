using Microsoft.EntityFrameworkCore;

namespace MinimalAPI.Data.Repositories;

public abstract class Repository<TEntity, TId>(ReservationDbContext context) : IRepository<TEntity, TId> where TEntity : class 
{
    public virtual async Task<IEnumerable<TEntity>> GetAllAsync() => await context.Set<TEntity>().ToListAsync();

    public virtual async Task<TEntity> GetByIdAsync(TId id)
    {
        var result = await context.Set<TEntity>().FindAsync(id);
        if (result is null)
            throw new KeyNotFoundException($"Item of type {typeof(TEntity).FullName} with id {id} not found");
        return result;
    }
    
    public virtual async Task<TEntity> AddAsync(TEntity e)
    {
        await context.Set<TEntity>().AddAsync(e);
        await context.SaveChangesAsync();
        return e;
    }
    
    public async Task<bool> ExistsAsync(TId id) => await context.Set<TEntity>().FindAsync(id) != null;
    
    public virtual async Task<TEntity> UpdateAsync(TEntity e)
    {
        context.Update(e);
        context.Entry(e).State = EntityState.Modified;
        await context.SaveChangesAsync();
        return e;
    }
}