using MinimalAPI.Data.Repositories;

namespace MinimalAPI.Services
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            var assembly = typeof(IRepository<>).Assembly;
            var repositoryTypes = assembly.GetTypes()
                .Where(t => t is { IsClass: true, IsAbstract: false } && typeof(IRepository<>).IsAssignableFrom(t));

            foreach (var implementation in repositoryTypes)
            {
                var itf = implementation.GetInterfaces()
                    .Where(i => typeof(IRepository<>).IsAssignableFrom(i)).Single();

                services.AddScoped(itf, implementation);
            }

            return services;
        }
    }
}