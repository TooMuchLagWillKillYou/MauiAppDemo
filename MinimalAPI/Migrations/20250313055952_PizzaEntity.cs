using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MinimalAPI.Migrations
{
    /// <inheritdoc />
    public partial class PizzaEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Reservations",
                keyColumn: "Id",
                keyValue: 1,
                column: "Hour",
                value: new DateTime(2025, 3, 13, 6, 59, 51, 591, DateTimeKind.Local).AddTicks(5661));

            migrationBuilder.UpdateData(
                table: "Reservations",
                keyColumn: "Id",
                keyValue: 2,
                column: "Hour",
                value: new DateTime(2025, 3, 13, 6, 59, 51, 591, DateTimeKind.Local).AddTicks(5732));

            migrationBuilder.UpdateData(
                table: "Reservations",
                keyColumn: "Id",
                keyValue: 3,
                column: "Hour",
                value: new DateTime(2025, 3, 13, 6, 59, 51, 591, DateTimeKind.Local).AddTicks(5803));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Reservations",
                keyColumn: "Id",
                keyValue: 1,
                column: "Hour",
                value: new DateTime(2024, 7, 14, 23, 8, 55, 142, DateTimeKind.Local).AddTicks(2625));

            migrationBuilder.UpdateData(
                table: "Reservations",
                keyColumn: "Id",
                keyValue: 2,
                column: "Hour",
                value: new DateTime(2024, 7, 14, 23, 8, 55, 142, DateTimeKind.Local).AddTicks(2675));

            migrationBuilder.UpdateData(
                table: "Reservations",
                keyColumn: "Id",
                keyValue: 3,
                column: "Hour",
                value: new DateTime(2024, 7, 14, 23, 8, 55, 142, DateTimeKind.Local).AddTicks(2679));
        }
    }
}
