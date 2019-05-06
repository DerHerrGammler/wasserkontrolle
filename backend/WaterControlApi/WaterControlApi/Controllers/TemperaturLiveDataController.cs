using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AquariumOnewireLibrary;
using AquariumOnewireLibrary.TemperatureSensors;
using WaterControlApi.Services;
using WaterControlApi.Data;

namespace WaterControlApi.Controllers
{
  [EnableCors("AllowOrigin")]
  [Route("api/[controller]")]
  [ApiController]
  public class TemperaturLiveDataController : ControllerBase
  {

    private readonly ApplicationDbContext _context;
    public TemperaturLiveDataController(ApplicationDbContext context)
    {
      _context = context;
    }
    // GET: api/TemperaturLiveData
    [HttpGet]
    public IActionResult Get()
    {
      OneWireMaster oneWire = new OneWireMaster();
      var sensor = oneWire._w1_master_temp_sensors;

      DS18B20 temp = new DS18B20(sensor.FirstOrDefault());
      string data = temp.GetTemperatur();
      return new JsonResult(double.Parse(data) / 1000);
    }
  }
}
