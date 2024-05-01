
using Microsoft.AspNetCore.Mvc;
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

            app.MapGet("/reservation/{id:int}", async (int id, IReservationRepository repository) => 
                await repository.Get(id));
           
            app.MapPost("/reservations", async ([FromBody]ReservationDto dto, IReservationRepository repository) =>
            {
                var newReservation = await repository.Add(dto);
                return Results.Created();
            }).Produces<ReservationDto>(StatusCodes.Status201Created);

            app.MapPut("/reservations", async ([FromBody] ReservationDto dto, IReservationRepository repository) =>
            {
                if (await repository.Get(dto.id) == null)
                {
                    return Results.Problem($"Reservation {dto.id} not found", statusCode: StatusCodes.Status404NotFound);
                }
                var updatedReservation = await repository.Update(dto);
                return Results.Ok(updatedReservation);
            }).ProducesProblem(StatusCodes.Status404NotFound).Produces<ReservationDto>(StatusCodes.Status204NoContent);

            app.MapDelete("/reservations/{id:int}", async (int id, IReservationRepository repository) =>
            {
                if (await repository.Get(id) == null)
                {
                    return Results.Problem($"Reservation {id} not found", statusCode: StatusCodes.Status404NotFound);
                }

                await repository.Delete(id);
                return Results.Ok();
            }).ProducesProblem(StatusCodes.Status404NotFound).Produces(StatusCodes.Status200OK);

            app.Run();
        }
    }
}
