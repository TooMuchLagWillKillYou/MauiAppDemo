using MinimalAPI.Data.Repositories;

namespace MinimalAPI.Services
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IReservationRepository, ReservationRepository>();
            services.AddScoped<IMenuItemRepository, MenuItemRepository>();
            services.AddScoped<IMenuItemCategoryRepository, MenuItemCategoryRepository>();
            services.AddScoped<IMenuItemSubCategoryRepository, MenuItemSubCategoryRepository>();
            services.AddScoped<IMenuRepository, MenuRepository>();
            services.AddScoped<IClosureDayRepository, ClosureDayRepository>();
            services.AddScoped<IWorkedHoursRepository, WorkedHoursRepository>();
            services.AddScoped<ITableRepository, TableRepository>();

            return services;
        }
    }
}