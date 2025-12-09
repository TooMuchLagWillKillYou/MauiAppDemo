using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Options;
using MinimalAPI.Data;
using MinimalAPI.Data.Repositories;
using MinimalAPI.Services;
using MinimalAPI.Services.MenuGenerator;
using System.Globalization;

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
        builder.Services.AddDbContext<ReservationDbContext>();
        builder.Services.AddRepositories();
        builder.Services.AddScoped<MenuFactory>();
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
            policyConfig.WithOrigins("http://localhost:5173")
                .AllowAnyHeader().AllowAnyMethod());

        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.UseRouting();
        app.UseAuthorization();
        app.MapControllers();
        app.Run();
    }
}

