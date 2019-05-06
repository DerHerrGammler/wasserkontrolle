using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WaterControlApi.Migrations
{
    public partial class ChangeTimeStampToDateTime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "TimeStamp",
                table: "WaterLevelHistories",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<DateTime>(
                name: "TimeStamp",
                table: "TemperatureHistories",
                nullable: false,
                oldClrType: typeof(string));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "TimeStamp",
                table: "WaterLevelHistories",
                nullable: false,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<string>(
                name: "TimeStamp",
                table: "TemperatureHistories",
                nullable: false,
                oldClrType: typeof(DateTime));
        }
    }
}
