using Microsoft.EntityFrameworkCore.Migrations;

namespace DiFe.Migrations
{
    public partial class CoinLastPrice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "LastPrice",
                table: "Coins",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastPrice",
                table: "Coins");
        }
    }
}
