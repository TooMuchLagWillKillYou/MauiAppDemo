using Microsoft.EntityFrameworkCore;

namespace MinimalAPI.Data
{
    public class ReservationDbContext : DbContext
    {
        public ReservationDbContext(DbContextOptions<ReservationDbContext> options) : base(options) { }
        
        public DbSet<ReservationEntity> Reservations => Set<ReservationEntity>();
        public DbSet<PizzaEntity> Pizzas => Set<PizzaEntity>();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);

            optionsBuilder.UseSqlServer("Data Source=(localdb)\\mssqllocaldb;Initial Catalog=ReservationManager;Integrated Security=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PizzaEntity>()
                .Property(x => x.IsDeleted)
                .HasDefaultValue(0);
        }
    }
}
