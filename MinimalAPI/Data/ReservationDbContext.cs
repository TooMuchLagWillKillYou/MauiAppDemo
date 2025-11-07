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
        public DbSet<MenuItemCategory> MenuItemCategories => Set<MenuItemCategory>();
        public DbSet<MenuItemSubCategory> MenuItemSubCategories => Set<MenuItemSubCategory>();
        public DbSet<MenuItem> MenuItems => Set<MenuItem>();
        public DbSet<Menu> Menus => Set<Menu>();

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
                .HasIndex(x => x.Name)
                .IsUnique();
            modelBuilder.Entity<MenuItem>()
                .ToTable("MenuItems", b => b.IsTemporal());
            modelBuilder.Entity<MenuItemCategory>()
                .Property(x => x.IsDeleted)
                .HasDefaultValue(0);
            modelBuilder.Entity<MenuItemSubCategory>()
                .Property(x => x.IsDeleted)
                .HasDefaultValue(0);
            modelBuilder.Entity<Menu>()
                .Property(x => x.IsDeleted)
                .HasDefaultValue(0);
        }
    }
}
