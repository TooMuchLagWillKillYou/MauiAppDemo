using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MinimalAPI.Migrations
{
    /// <inheritdoc />
    public partial class TimeOnlyNew : Migration
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Reservations",
                columns: new[] { "Id", "Hour", "Name", "Notes", "People", "Table" },
                values: new object[,]
                {
                    { 1, new TimeOnly(22, 27, 43, 919).Add(TimeSpan.FromTicks(1565)), "Mario", "", 5, "F2" },
                    { 2, new TimeOnly(22, 27, 43, 919).Add(TimeSpan.FromTicks(1625)), "Rossi", "possibimente sui divanetti", 2, "7" },
                    { 3, new TimeOnly(22, 27, 43, 919).Add(TimeSpan.FromTicks(1628)), "Paolo", "", 10, "30" }
                });
        }
    }
}
