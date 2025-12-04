using Microsoft.EntityFrameworkCore;
using MinimalAPI.Common;

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

        public DbSet<Reservation> Reservations => Set<Reservation>();
        public DbSet<MenuItemCategory> MenuItemCategories => Set<MenuItemCategory>();
        public DbSet<MenuItemSubCategory> MenuItemSubCategories => Set<MenuItemSubCategory>();
        public DbSet<MenuItem> MenuItems => Set<MenuItem>();
        public DbSet<Menu> Menus => Set<Menu>();
        public DbSet<ClosureDay> ClosureDays => Set<ClosureDay>();
        public DbSet<WorkedHours> WorkedHours => Set<WorkedHours>();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration.GetValue<string>("ConnectionStrings:DefaultConnection"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MenuItem>()
                .Property(x => x.IsDeleted)
                .HasDefaultValue(0);
            modelBuilder.Entity<MenuItem>()
                .HasQueryFilter(e => !e.IsDeleted);
            modelBuilder.Entity<MenuItem>()
                .HasIndex(x => x.Name)
                .IsUnique();
            modelBuilder.Entity<MenuItem>()
                .ToTable("MenuItems", b => b.IsTemporal());
            modelBuilder.Entity<Reservation>()
                .Property(x => x.IsDeleted) 
                .HasDefaultValue(0);
            modelBuilder.Entity<Reservation>()
                .Property(x => x.Status)
                .HasDefaultValue(ReservationStatus.NotArrived);
            modelBuilder.Entity<Reservation>()
                .HasQueryFilter(e => !e.IsDeleted);
        }
    }
}
