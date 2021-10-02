using Microsoft.EntityFrameworkCore.Migrations;

namespace DiFe.Migrations
{
    public partial class CoinLastValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "LastValue",
                table: "Coins",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastValue",
                table: "Coins");
        }
    }
}
