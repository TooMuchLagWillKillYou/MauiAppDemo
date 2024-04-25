namespace Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public TimeOnly Hour { get; set; }
        public int People { get; set; }
        public int Table { get; set; }
        public string? Notes { get; set; }
    }
}
