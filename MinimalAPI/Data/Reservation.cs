using MinimalAPI.Common;
using MinimalAPI.Data.Repositories;

namespace MinimalAPI.Data
{
    public class Reservation : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Hour { get; set; }
        public int People { get; set; }
        public string? Table { get; set; }
        public string? Notes { get; set; }
        public ReservationStatus Status { get; set; }
        public bool IsDeleted { get; set; }
    }
}
