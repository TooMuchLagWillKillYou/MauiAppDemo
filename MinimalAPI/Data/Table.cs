namespace MinimalAPI.Data
{
    public class Table : IEntity
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int Capacity { get; set; }
        public bool CanBeMoved { get; set; }
    }
}
