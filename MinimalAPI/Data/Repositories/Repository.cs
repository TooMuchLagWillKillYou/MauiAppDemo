using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MinimalAPI.Data.Repositories;

public class Repository<TEntity>(ReservationDbContext ctx) 
    : IRepository<TEntity> where TEntity : class, IEntity
{
    public IQueryable<TEntity> Query() => ctx.Set<TEntity>();
    public async Task<TEntity?> Get(int id, CancellationToken token = default)
        => await Query().FirstOrDefaultAsync(e => e.Id == id, token);
    public async Task<TEntity> Add(TEntity e, CancellationToken token = default)
    {
        await ctx.Set<TEntity>().AddAsync(e, token);
        await ctx.SaveChangesAsync(token);
        return e;
    }
    public async Task<bool> Exists(int id, CancellationToken token = default)
        => await Query().AnyAsync(e => e.Id == id, token);
    public async Task<TEntity> Update(TEntity e, CancellationToken token = default)
    {
        if (ctx.Entry(e).State == EntityState.Detached)
            ctx.Set<TEntity>().Attach(e);

        ctx.Entry(e).State = EntityState.Modified;
        await ctx.SaveChangesAsync(token);
        return e;
    }
    public async Task Delete(int id, CancellationToken token = default)
    {
        var e = await Get(id, token);
        ctx.Remove(e);
        await ctx.SaveChangesAsync(token);
    }
}