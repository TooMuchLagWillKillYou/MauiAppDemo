namespace MinimalAPI.Dtos
{
    public record ReservationDto(int id, string name, DateTime hour, int people, string? table, string? notes);
}
