using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MinimalAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Reservations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Hour = table.Column<DateTime>(type: "datetime2", nullable: false),
                    People = table.Column<int>(type: "int", nullable: false),
                    Table = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservations", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Reservations",
                columns: new[] { "Id", "Hour", "Name", "Notes", "People", "Table" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 5, 1, 11, 21, 0, 723, DateTimeKind.Local).AddTicks(6615), "Mario", "", 5, "F2" },
                    { 2, new DateTime(2024, 5, 1, 11, 21, 0, 723, DateTimeKind.Local).AddTicks(6663), "Rossi", "possibimente sui divanetti", 2, "7" },
                    { 3, new DateTime(2024, 5, 1, 11, 21, 0, 723, DateTimeKind.Local).AddTicks(6665), "Paolo", "", 10, "30" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reservations");
        }
    }
}
