namespace MinimalAPI.Data.Repositories
{
    public interface IEntity
    {
        public int Id { get; set; }
        public bool IsDeleted { get; set; }
    }
    //public interface IRepository<TEntity>
    //{
    //    IQueryable<TEntity> Query();
    //    Task<TEntity> GetById(int id, CancellationToken token = default);
    //    Task<TEntity> Add(TEntity e, CancellationToken token = default);
    //    Task<bool> Exists(int id, CancellationToken token = default);
    //    Task<TEntity> Update(TEntity e, CancellationToken token = default);
    //    Task Delete(int id, CancellationToken token = default);
    //}
    //public class Repository<TEntity>(ReservationDbContext ctx) : IRepository<TEntity> where TEntity : class, IEntity
    //{
    //    public IQueryable<TEntity> Query() => ctx.Set<TEntity>().Where(e => !e.IsDeleted);
    //    public async Task<TEntity> GetById(int id, CancellationToken token = default)
    //    {
    //        var result = await Query().FirstAsync(e => e.Id == id, token);

    //        if (result is null) throw new KeyNotFoundException($"Item of type {typeof(TEntity).FullName} with id {id} not found");

    //        return result;
    //    }
    //    public async Task<TEntity> Add(TEntity e, CancellationToken token = default)
    //    {
    //        await ctx.Set<TEntity>().AddAsync(e, token);
    //        await ctx.SaveChangesAsync(token);
    //        return e;
    //    }
    //    public async Task<bool> Exists(int id, CancellationToken token = default)
    //        => await Query().AnyAsync(e => e.Id == id, token);
    //    public async Task<TEntity> Update(TEntity e, CancellationToken token = default)
    //    {
    //        if (ctx.Entry(e).State == EntityState.Detached)
    //            ctx.Set<TEntity>().Attach(e);

    //        ctx.Entry(e).State = EntityState.Modified;
    //        await ctx.SaveChangesAsync(token);
    //        return e;
    //    }
    //    public async Task Delete(int id, CancellationToken token = default)
    //    {
    //        var e = await GetById(id, token);
    //        e.IsDeleted = true;

    //        ctx.Entry(e).State = EntityState.Modified;
    //        await ctx.SaveChangesAsync(token);
    //    }
    //}
    //public interface IMenuItemRepository : IRepository2<MenuItem>
    //{
    //    Task<bool> Exists(Expression<Func<MenuItem, bool>> predicate);
    //}
    //public class MenuItemRepository(ReservationDbContext ctx) : Repository<MenuItem>(ctx), IMenuItemRepository
    //{
    //    public async Task<bool> Exists(Expression<Func<MenuItem, bool>> predicate)
    //        => await Query().AnyAsync(predicate);
    //}
}
