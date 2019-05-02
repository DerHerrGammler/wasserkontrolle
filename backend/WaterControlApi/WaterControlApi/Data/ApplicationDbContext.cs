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
        .Property(c => c.SuccessColor)
        .IsRequired();

      modelBuilder.Entity<Configuration>()
        .Property(c => c.WarningColor)
        .IsRequired();

      modelBuilder.Entity<Configuration>()
        .Property(c => c.ErrorColor)
        .IsRequired();

      modelBuilder.Entity<Configuration>()
        .Property(c => c.MeasuringIntervalTemperatur)
        .HasDefaultValue(10000);

      modelBuilder.Entity<Configuration>()
        .Property(c => c.MeasuringIntervalWaterLevel)
        .HasDefaultValue(10000);
    }
  }
}
