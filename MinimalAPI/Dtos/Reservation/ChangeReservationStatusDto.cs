using MinimalAPI.Common;

namespace MinimalAPI.Dtos.Reservation
{
    public record ChangeReservationStatusDto(int Id, ReservationStatus Status);
}
