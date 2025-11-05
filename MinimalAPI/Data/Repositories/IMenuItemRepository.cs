using System.Linq.Expressions;

namespace MinimalAPI.Data.Repositories;

public interface IMenuItemRepository : IRepository<MenuItem>
{
    Task<bool> Exists(Expression<Func<MenuItem, bool>> predicate);
}