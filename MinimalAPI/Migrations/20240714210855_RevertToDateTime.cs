using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MinimalAPI.Migrations
{
    /// <inheritdoc />
    public partial class RevertToDateTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "Hour",
                table: "Reservations",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(TimeOnly),
                oldType: "time");

            migrationBuilder.InsertData(
                table: "Reservations",
                columns: new[] { "Id", "Hour", "Name", "Notes", "People", "Table" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 7, 14, 23, 8, 55, 142, DateTimeKind.Local).AddTicks(2625), "Mario", "", 5, "F2" },
                    { 2, new DateTime(2024, 7, 14, 23, 8, 55, 142, DateTimeKind.Local).AddTicks(2675), "Rossi", "possibimente sui divanetti", 2, "7" },
                    { 3, new DateTime(2024, 7, 14, 23, 8, 55, 142, DateTimeKind.Local).AddTicks(2679), "Paolo", "", 10, "30" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<TimeOnly>(
                name: "Hour",
                table: "Reservations",
                type: "time",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }
    }
}
