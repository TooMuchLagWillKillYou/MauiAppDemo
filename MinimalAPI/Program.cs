
using Microsoft.EntityFrameworkCore;
using MinimalAPI.Data;
using MinimalAPI.Dtos;

namespace MinimalAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddAuthorization();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors();
            builder.Services.AddDbContext<ReservationDbContext>(opt => 
                opt.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));
            builder.Services.AddScoped<IReservationRepository, ReservationRepository>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(policyConfig => 
                policyConfig.WithOrigins("http://localhost:3000")
                    .AllowAnyHeader().AllowAnyMethod());

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapGet("/reservations", (IReservationRepository repository) => repository.GetAll());

            app.Run();
        }
    }
}
