using MinimalAPI.Data.Repositories;

namespace MinimalAPI.Data
{
    public class ClosureDay : IEntity
    {
        public int Id { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public string? Reason { get; set; }
    }
}
