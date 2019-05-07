using AquariumOnewireLibrary;
using AquariumOnewireLibrary.TemperatureSensors;
using FluentScheduler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using WaterControlApi.Data;
using WaterControlApi.Models;
using WaterControlApi.Services.Interfaces;

namespace WaterControlApi.Services
{
  public class History : IHistory
  {
    private readonly ApplicationDbContext _context;
    private readonly IHCSR04 _hCSR04;

    public History(ApplicationDbContext context, IHCSR04 hCSR04)
    {
      _hCSR04 = hCSR04;
      _context = context;
      Console.WriteLine(">>>Contructor<<<");
      InitJobs();
    }

    private void InitJobs()
    {
      Console.WriteLine(">>>Init<<<");
      int temperaturInterval = _context.Configurations.SingleOrDefault().MeasuringIntervalTemperatur;
      int waterLevelInterval = _context.Configurations.SingleOrDefault().MeasuringIntervalWaterLevel;
      //JobManager.AddJob(() => TemperaturLogging(), (s) => s.WithName("temperatur") .ToRunEvery(5).Seconds());
      //JobManager.AddJob(() => WaterLevelLogging(), (s) => s.WithName("waterLevel").ToRunEvery(5).Seconds());
      //JobManager.Start();
      TemperaturLogging();
      WaterLevelLogging();
      //Thread thread1 = new Thread(TemperaturLogging);
      //Thread thread2 = new Thread(WaterLevelLogging);
      //thread1.Start();
      //thread2.Start();
    }

    private void TemperaturLogging()
    {
      Console.WriteLine(">>>test<<<");
      OneWireMaster oneWire = new OneWireMaster();
      var sensor = oneWire._w1_master_temp_sensors;

      DS18B20 temp = new DS18B20(sensor.FirstOrDefault());
      string data = temp.GetTemperatur();
      double temperature = double.Parse(data) / 1000;
      _context.TemperatureHistories.Add(new TemperatureHistory() { SenesorName = "temperature", SensorId = sensor.FirstOrDefault(), TemperaturValue = temperature, TimeStamp = DateTime.UtcNow });
      _context.SaveChanges();
    }

    private void WaterLevelLogging()
    {
      _context.WaterLevelHistories.Add(new WaterLevelHistory() { SenesorName = "waterLevel", WaterLevelValue = double.Parse(_hCSR04.GetDistance()), TimeStamp = DateTime.UtcNow });
      _context.SaveChanges();
    }

    public void removeJob(string name)
    {
      JobManager.Stop();
      JobManager.RemoveJob(name);
    }



  }
}
