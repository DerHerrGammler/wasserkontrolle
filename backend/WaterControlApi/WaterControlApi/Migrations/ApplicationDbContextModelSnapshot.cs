﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WaterControlApi.Data;

namespace WaterControlApi.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.0-rtm-35687")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("WaterControlApi.Models.Configuration", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ErrorColor")
                        .IsRequired();

                    b.Property<int>("MeasuringIntervalTemperatur")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(10000);

                    b.Property<int>("MeasuringIntervalWaterLevel")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(10000);

                    b.Property<string>("SuccessColor")
                        .IsRequired();

                    b.Property<string>("WarningColor")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Configurations");
                });

            modelBuilder.Entity("WaterControlApi.Models.RGBLed", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BluePin");

                    b.Property<string>("Color");

                    b.Property<int>("GreenPin");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<int>("RedPin");

                    b.Property<bool>("State");

                    b.HasKey("Id");

                    b.ToTable("RGBLeds");
                });
#pragma warning restore 612, 618
        }
    }
}