using Microsoft.EntityFrameworkCore;

namespace MinimalAPI.Data
{
    public class ReservationDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public ReservationDbContext(DbContextOptions<ReservationDbContext> options, IConfiguration configuration) :
            base(options)
        {
            _configuration = configuration;
        }
        
        public DbSet<ReservationEntity> Reservations => Set<ReservationEntity>();
        public DbSet<PizzaEntity> Pizzas => Set<PizzaEntity>();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration.GetValue<string>("ConnectionStrings:DefaultConnection"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PizzaEntity>()
                .Property(x => x.IsDeleted)
                .HasDefaultValue(0);
        }
    }
}
