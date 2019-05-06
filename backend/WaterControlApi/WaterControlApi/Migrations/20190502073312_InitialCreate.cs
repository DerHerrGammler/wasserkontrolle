using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WaterControlApi.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Configurations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    SuccessColor = table.Column<string>(nullable: false),
                    WarningColor = table.Column<string>(nullable: false),
                    ErrorColor = table.Column<string>(nullable: false),
                    MeasuringIntervalTemperatur = table.Column<int>(nullable: false, defaultValue: 10000),
                    MeasuringIntervalWaterLevel = table.Column<int>(nullable: false, defaultValue: 10000)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Configurations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RGBLeds",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    Color = table.Column<string>(nullable: true),
                    State = table.Column<bool>(nullable: false),
                    RedPin = table.Column<int>(nullable: false),
                    GreenPin = table.Column<int>(nullable: false),
                    BluePin = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RGBLeds", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TemperatureHistories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    SenesorName = table.Column<string>(nullable: false),
                    SensorId = table.Column<string>(nullable: false),
                    TemperaturValue = table.Column<double>(nullable: false),
                    TimeStamp = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TemperatureHistories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WaterLevelHistories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    SenesorName = table.Column<string>(nullable: false),
                    WaterLevelValue = table.Column<double>(nullable: false),
                    TimeStamp = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WaterLevelHistories", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Configurations");

            migrationBuilder.DropTable(
                name: "RGBLeds");

            migrationBuilder.DropTable(
                name: "TemperatureHistories");

            migrationBuilder.DropTable(
                name: "WaterLevelHistories");
        }
    }
}
