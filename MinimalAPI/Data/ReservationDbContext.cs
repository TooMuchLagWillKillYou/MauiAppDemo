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
        public DbSet<Table> Tables => Set<Table>();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration.GetValue<string>("ConnectionStrings:DefaultConnection"));
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<MenuItem>()
                .Property(x => x.IsDeleted)
                .HasDefaultValue(0);
            builder.Entity<MenuItem>()
                .HasQueryFilter(e => !e.IsDeleted);
            builder.Entity<MenuItem>()
                .HasIndex(x => x.Name)
                .IsUnique();
            builder.Entity<MenuItem>()
                .ToTable("MenuItems", b => b.IsTemporal());

            builder.Entity<Reservation>()
                .Property(x => x.IsDeleted) 
                .HasDefaultValue(0);
            builder.Entity<Reservation>()
                .Property(x => x.Status)
                .HasDefaultValue(ReservationStatus.NotArrived);
            builder.Entity<Reservation>()
                .HasQueryFilter(e => !e.IsDeleted);

            builder.Entity<Table>()
                .ToTable("Tables", b => b.IsTemporal());
            builder.Entity<Table>()
                .Property(x => x.Shift)
                .HasDefaultValue(1);

            builder.Entity<ClosureDay>()
                .Property("From")
                .HasColumnType("date");
            builder.Entity<ClosureDay>()
                .Property("To")
                .HasColumnType("date");
        }
    }
}
