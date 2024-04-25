namespace Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int People { get; set; }
        /// <summary>
        /// Must be a string to accept table names such as "F4"
        /// </summary>
        public string? Table { get; set; }
        public string? Notes { get; set; }
    }
}
