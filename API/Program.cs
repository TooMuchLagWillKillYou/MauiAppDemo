
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var AllowSpecificOrigins = "_AllowSpecificOrigins";
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<TableDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("SqlConnection")));
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: AllowSpecificOrigins,
                                  policy =>
                                  {
                                      policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
                                  });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors(AllowSpecificOrigins);
            
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
