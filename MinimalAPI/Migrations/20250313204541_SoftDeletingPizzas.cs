using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MinimalAPI.Migrations
{
    /// <inheritdoc />
    public partial class SoftDeletingPizzas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Reservations",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Reservations",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Reservations",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Pizzas",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Pizzas");

            migrationBuilder.InsertData(
                table: "Reservations",
                columns: new[] { "Id", "Hour", "Name", "Notes", "People", "Table" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 3, 13, 20, 29, 10, 699, DateTimeKind.Local).AddTicks(1358), "Mario", "", 5, "F2" },
                    { 2, new DateTime(2025, 3, 13, 20, 29, 10, 699, DateTimeKind.Local).AddTicks(1425), "Rossi", "possibimente sui divanetti", 2, "7" },
                    { 3, new DateTime(2025, 3, 13, 20, 29, 10, 699, DateTimeKind.Local).AddTicks(1429), "Paolo", "", 10, "30" }
                });
        }
    }
}
