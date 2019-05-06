using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaterControlApi.Models;

namespace WaterControlApi.Data
{
  public class ApplicationDbContext : DbContext
  {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    { }

    public DbSet<RGBLed> RGBLeds { get; set; }
    public DbSet<Configuration> Configurations { get; set; }
    public DbSet<TemperatureHistory> TemperatureHistories { get; set; }
    public DbSet<WaterLevelHistory> WaterLevelHistories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<RGBLed>()
        .HasKey(r => r.Id);

      modelBuilder.Entity<RGBLed>()
        .Property(r => r.Name)
        .IsRequired();

      modelBuilder.Entity<RGBLed>()
        .Property(r => r.RedPin)
        .IsRequired();

      modelBuilder.Entity<RGBLed>()
        .Property(r => r.GreenPin)
        .IsRequired();

      modelBuilder.Entity<RGBLed>()
        .Property(r => r.BluePin)
        .IsRequired();

      modelBuilder.Entity<Configuration>()
        .HasKey(c => c.Id);

      modelBuilder.Entity<Configuration>()
        .Property(c => c.HighColor)
        .IsRequired();

      modelBuilder.Entity<Configuration>()
        .Property(c => c.MediumColor)
        .IsRequired();

      modelBuilder.Entity<Configuration>()
        .Property(c => c.LowColor)
        .IsRequired();

      modelBuilder.Entity<Configuration>()
        .Property(c => c.HighValue)
        .IsRequired();

      modelBuilder.Entity<Configuration>()
        .Property(c => c.LowValue)
        .IsRequired();

      modelBuilder.Entity<Configuration>()
        .Property(c => c.MeasuringIntervalTemperatur)
        .HasDefaultValue(10000);

      modelBuilder.Entity<Configuration>()
        .Property(c => c.MeasuringIntervalWaterLevel)
        .HasDefaultValue(10000);

      modelBuilder.Entity<TemperatureHistory>()
        .HasKey(t => t.Id);

      modelBuilder.Entity<TemperatureHistory>()
        .Property(t => t.SenesorName)
        .IsRequired();

      modelBuilder.Entity<TemperatureHistory>()
        .Property(t => t.SensorId)
        .IsRequired();

      modelBuilder.Entity<TemperatureHistory>()
        .Property(t => t.TemperaturValue)
        .IsRequired();

      modelBuilder.Entity<TemperatureHistory>()
        .Property(t => t.TimeStamp)
        .IsRequired();

      modelBuilder.Entity<WaterLevelHistory>()
        .HasKey(w => w.Id);

      modelBuilder.Entity<WaterLevelHistory>()
        .Property(w => w.SenesorName)
        .IsRequired();

      modelBuilder.Entity<WaterLevelHistory>()
        .Property(w => w.TimeStamp)
        .IsRequired();

      modelBuilder.Entity<WaterLevelHistory>()
        .Property(w => w.WaterLevelValue)
        .IsRequired();

      modelBuilder.Entity<Configuration>()
        .HasMany(c => c.RGBLeds)
        .WithOne(c => c.Configuration);

      // Data Seed

      modelBuilder.Entity<Configuration>()
        .HasData(new Configuration() { Id = 1, MeasuringIntervalTemperatur = 5, MeasuringIntervalWaterLevel = 5, HighColor = "green", MediumColor = "yellow", LowColor = "red", LowValue = 5.5, HighValue = 30.5 });

      //modelBuilder.Entity<RGBLed>()
      //  .HasData(new RGBLed() { Id = 1, Name = "Temperatur", })
    }
  }
}
