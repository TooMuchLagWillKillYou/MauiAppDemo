using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MinimalAPI.Migrations
{
    /// <inheritdoc />
    public partial class PizzaOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "Pizzas",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Order",
                table: "Pizzas");
        }
    }
}
