using MinimalAPI.Common;

namespace MinimalAPI.Dtos.Reservation
{
    public record ReservationForListDto(int Id, 
        string Name, 
        DateTime Hour, 
        int People, 
        string? Table, 
        string? Notes, 
        ReservationStatus Status);
}
