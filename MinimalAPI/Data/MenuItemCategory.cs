using MinimalAPI.Data.Repositories;

namespace MinimalAPI.Data;

public class MenuItemCategory : IEntity, ICanBeDeleted
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<MenuItem> MenuItems { get; set; }
    public bool IsDeleted { get; set; }
}