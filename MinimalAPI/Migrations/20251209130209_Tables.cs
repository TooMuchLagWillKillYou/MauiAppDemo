using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MinimalAPI.Migrations
{
    /// <inheritdoc />
    public partial class Tables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Table",
                table: "Reservations");

            migrationBuilder.AddColumn<int>(
                name: "TableId",
                table: "Reservations",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Table",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Capacity = table.Column<int>(type: "int", nullable: false),
                    CanBeMoved = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_TableId",
                table: "Reservations",
                column: "TableId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Table_TableId",
                table: "Reservations",
                column: "TableId",
                principalTable: "Table",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Table_TableId",
                table: "Reservations");

            migrationBuilder.DropTable(
                name: "Table");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_TableId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "TableId",
                table: "Reservations");

            migrationBuilder.AddColumn<string>(
                name: "Table",
                table: "Reservations",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
