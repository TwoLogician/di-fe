using Microsoft.EntityFrameworkCore.Migrations;

namespace DiFe.Migrations
{
    public partial class CoinIsFarming : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsFarming",
                table: "Coins",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFarming",
                table: "Coins");
        }
    }
}
