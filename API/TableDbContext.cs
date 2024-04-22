using Microsoft.EntityFrameworkCore;
using Models;

namespace API
{
    public class TableDbContext : DbContext
    {
        public TableDbContext(DbContextOptions options) : base(options)
        {
                
        }

        public DbSet<Reservation> Reservations { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }
    }
}
