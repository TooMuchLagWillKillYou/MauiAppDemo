using MinimalAPI.Common;

namespace MinimalAPI.Dtos.Reservation
{
    public record ReservationForListDto(int Id, 
        string Name, 
        DateOnly Day,
        TimeOnly Hour, 
        int People, 
        int? Table, 
        string? Notes, 
        ReservationStatus Status);
}
