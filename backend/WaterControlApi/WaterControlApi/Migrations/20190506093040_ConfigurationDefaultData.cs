using Microsoft.EntityFrameworkCore.Migrations;

namespace WaterControlApi.Migrations
{
    public partial class ConfigurationDefaultData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Configurations",
                columns: new[] { "Id", "HighColor", "HighValue", "LowColor", "LowValue", "MeasuringIntervalTemperatur", "MeasuringIntervalWaterLevel", "MediumColor" },
                values: new object[] { 1, "green", 30.5, "red", 5.5, 5, 5, "yellow" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Configurations",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
