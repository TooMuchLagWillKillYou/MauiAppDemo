using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MinimalAPI.Migrations
{
    /// <inheritdoc />
    public partial class IngredientsTranslations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EnglishTranslation",
                table: "Pizzas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "GermanTranslation",
                table: "Pizzas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EnglishTranslation",
                table: "Pizzas");

            migrationBuilder.DropColumn(
                name: "GermanTranslation",
                table: "Pizzas");
        }
    }
}
