namespace MinimalAPI.Data
{
    public class WorkedHours: IEntity
    {
        public int Id { get; set; }
        public string Person { get; set; }
        public DateTime Day { get; set; }
        public float HoursAmount { get; set; }
    }
}
