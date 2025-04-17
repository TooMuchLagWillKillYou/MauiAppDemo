using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MinimalAPI.Data;
using System.Globalization;
using MinimalAPI.Data.Repositories;
using MinimalAPI.Services.MenuGenerator;

namespace MinimalAPI;
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
        builder.Services.AddScoped<IPizzaRepository, PizzaRepository>();
        builder.Services.AddSingleton<MenuFactory>();
        builder.Services.Configure<RequestLocalizationOptions>(options =>
        {
            options.DefaultRequestCulture = new RequestCulture(culture: "it-IT", uiCulture: "it-IT");
            options.SupportedCultures = new[] { new CultureInfo("it-IT") };
        });
        builder.Services.AddControllers();
        
        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        var locOptions = app.Services.GetService<IOptions<RequestLocalizationOptions>>();
        app.UseRequestLocalization(locOptions.Value);

        app.UseCors(policyConfig =>
            policyConfig.WithOrigins("http://localhost:3000")
                .AllowAnyHeader().AllowAnyMethod());

        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.UseRouting();
        app.UseAuthorization();
        app.MapControllers();
        app.Run();
    }
}

