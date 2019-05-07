using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AquariumOnewireLibrary;
using AquariumOnewireLibrary.TemperatureSensors;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterControlApi.Data;
using WaterControlApi.Models;
using WaterControlApi.Services;
using WaterControlApi.Services.Interfaces;

namespace WaterControlApi.Controllers
{
  [EnableCors("AllowOrigin")]
  [Route("api/[controller]")]
  [ApiController]
  public class IntervalTempController : ControllerBase
  {
    private readonly ApplicationDbContext _context;
    public IntervalTempController(ApplicationDbContext context)
    {
      _context = context;
    }
    // PUT: api/intervalTemp
    [HttpPut()]
    public void Put()
    {
      OneWireMaster oneWire = new OneWireMaster();
      var sensor = oneWire._w1_master_temp_sensors;

      DS18B20 temp = new DS18B20(sensor.FirstOrDefault());
      string data = temp.GetTemperatur();
      double temperature = double.Parse(data) / 1000;
      _context.TemperatureHistories.Add(new TemperatureHistory() { SenesorName = "temperature", SensorId = sensor.FirstOrDefault(), TemperaturValue = temperature, TimeStamp = DateTime.UtcNow });
      _context.SaveChanges();
    }
  }
}
