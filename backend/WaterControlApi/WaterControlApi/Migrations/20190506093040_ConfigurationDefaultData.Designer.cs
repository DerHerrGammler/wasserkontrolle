﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WaterControlApi.Data;

namespace WaterControlApi.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20190506093040_ConfigurationDefaultData")]
    partial class ConfigurationDefaultData
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.0-rtm-35687")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("WaterControlApi.Models.Configuration", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("HighColor")
                        .IsRequired();

                    b.Property<double>("HighValue");

                    b.Property<string>("LowColor")
                        .IsRequired();

                    b.Property<double>("LowValue");

                    b.Property<int>("MeasuringIntervalTemperatur")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(10000);

                    b.Property<int>("MeasuringIntervalWaterLevel")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(10000);

                    b.Property<string>("MediumColor")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Configurations");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            HighColor = "green",
                            HighValue = 30.5,
                            LowColor = "red",
                            LowValue = 5.5,
                            MeasuringIntervalTemperatur = 5,
                            MeasuringIntervalWaterLevel = 5,
                            MediumColor = "yellow"
                        });
                });

            modelBuilder.Entity("WaterControlApi.Models.RGBLed", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BluePin");

                    b.Property<string>("Color");

                    b.Property<int?>("ConfigurationId");

                    b.Property<int>("GreenPin");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<int>("RedPin");

                    b.Property<bool>("State");

                    b.HasKey("Id");

                    b.HasIndex("ConfigurationId");

                    b.ToTable("RGBLeds");
                });

            modelBuilder.Entity("WaterControlApi.Models.TemperatureHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("SenesorName")
                        .IsRequired();

                    b.Property<string>("SensorId")
                        .IsRequired();

                    b.Property<double>("TemperaturValue");

                    b.Property<DateTime>("TimeStamp");

                    b.HasKey("Id");

                    b.ToTable("TemperatureHistories");
                });

            modelBuilder.Entity("WaterControlApi.Models.WaterLevelHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("SenesorName")
                        .IsRequired();

                    b.Property<DateTime>("TimeStamp");

                    b.Property<double>("WaterLevelValue");

                    b.HasKey("Id");

                    b.ToTable("WaterLevelHistories");
                });

            modelBuilder.Entity("WaterControlApi.Models.RGBLed", b =>
                {
                    b.HasOne("WaterControlApi.Models.Configuration", "Configuration")
                        .WithMany("RGBLeds")
                        .HasForeignKey("ConfigurationId");
                });
#pragma warning restore 612, 618
        }
    }
}
