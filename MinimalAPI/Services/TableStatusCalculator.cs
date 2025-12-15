using MinimalAPI.Common;
using MinimalAPI.Data;

namespace MinimalAPI.Services
{
    public static class TableStatusCalculator
    {
        public static TableStatus Calculate(Table table, DateOnly day)
        {
            var reservations = table.Reservations.Where(r => r.Day == day
                && r.Status != ReservationStatus.Gone 
                && r.Status != ReservationStatus.Cancelled)
                .ToList();

            if (reservations.Any(r => r.Status == ReservationStatus.Arrived))
                return TableStatus.Occupied;

            if (reservations.Any())
                return TableStatus.Reserved;
            
            return TableStatus.Free;
        }
    }
}
