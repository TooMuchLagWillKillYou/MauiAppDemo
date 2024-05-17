using Microsoft.EntityFrameworkCore;

namespace MinimalAPI.Data
{
    public static class SeedData
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ReservationEntity>().HasData(new List<ReservationEntity>()
            {
                new()
                {
                    Id = 1,
                    Name = "Mario",
                    Hour = DateTime.Now,
                    People = 5,
                    Table = "F2",
                    Notes = string.Empty,
                },
                new()
                {
                    Id = 2,
                    Name = "Rossi",
                    Hour = DateTime.Now,
                    People = 2,
                    Table = "7",
                    Notes = "possibimente sui divanetti",
                },
                new()
                {
                    Id = 3,
                    Name = "Paolo",
                    Hour = DateTime.Now,
                    People = 10,
                    Table = "30",
                    Notes = string.Empty,
                }
            });
        }
    }
}
