namespace MinimalAPI.Data.Repositories
{
    public interface IEntity
    {
        public int Id { get; set; }
        public bool IsDeleted { get; set; }
    }
}
