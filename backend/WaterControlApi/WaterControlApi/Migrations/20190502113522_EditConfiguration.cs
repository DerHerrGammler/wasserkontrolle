using Microsoft.EntityFrameworkCore.Migrations;

namespace WaterControlApi.Migrations
{
    public partial class EditConfiguration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "WarningColor",
                table: "Configurations",
                newName: "MediumColor");

            migrationBuilder.RenameColumn(
                name: "SuccessColor",
                table: "Configurations",
                newName: "LowColor");

            migrationBuilder.RenameColumn(
                name: "ErrorColor",
                table: "Configurations",
                newName: "HighColor");

            migrationBuilder.AddColumn<int>(
                name: "ConfigurationId",
                table: "RGBLeds",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "HighValue",
                table: "Configurations",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "LowValue",
                table: "Configurations",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateIndex(
                name: "IX_RGBLeds_ConfigurationId",
                table: "RGBLeds",
                column: "ConfigurationId");

            migrationBuilder.AddForeignKey(
                name: "FK_RGBLeds_Configurations_ConfigurationId",
                table: "RGBLeds",
                column: "ConfigurationId",
                principalTable: "Configurations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RGBLeds_Configurations_ConfigurationId",
                table: "RGBLeds");

            migrationBuilder.DropIndex(
                name: "IX_RGBLeds_ConfigurationId",
                table: "RGBLeds");

            migrationBuilder.DropColumn(
                name: "ConfigurationId",
                table: "RGBLeds");

            migrationBuilder.DropColumn(
                name: "HighValue",
                table: "Configurations");

            migrationBuilder.DropColumn(
                name: "LowValue",
                table: "Configurations");

            migrationBuilder.RenameColumn(
                name: "MediumColor",
                table: "Configurations",
                newName: "WarningColor");

            migrationBuilder.RenameColumn(
                name: "LowColor",
                table: "Configurations",
                newName: "SuccessColor");

            migrationBuilder.RenameColumn(
                name: "HighColor",
                table: "Configurations",
                newName: "ErrorColor");
        }
    }
}
