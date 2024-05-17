namespace MinimalAPI.Data
{
    public class ReservationEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Hour { get; set; }
        public int People { get; set; }
        public string? Table { get; set; }
        public string? Notes { get; set; }
    }
}
