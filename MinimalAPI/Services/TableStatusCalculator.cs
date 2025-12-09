using MinimalAPI.Common;
using MinimalAPI.Data;

namespace MinimalAPI.Services
{
    public static class TableStatusCalculator
    {
        public static TableStatus Calculate(Table table, DateTime day)
        {
            var reservations = table.Reservations.Where(r => r.Hour.Date == day.Date).ToList();

            if (reservations.Any(r => r.Status == ReservationStatus.Arrived))
                return TableStatus.Occupied;

            if (reservations.Any())
                return TableStatus.Reserved;
            
            return TableStatus.Free;
        }
    }
}
