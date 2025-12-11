using MinimalAPI.Data.Repositories;

namespace MinimalAPI.Data
{
    public class ClosureDay : IEntity
    {
        public int Id { get; set; }
        public DateOnly From { get; set; }
        public DateOnly To { get; set; }
        public string? Reason { get; set; }
    }
}
