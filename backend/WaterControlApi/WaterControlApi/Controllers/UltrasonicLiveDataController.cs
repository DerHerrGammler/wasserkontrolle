using System;
using System.Device.Gpio;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WaterControlApi.Services;
using WaterControlApi.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WaterControlApi.Controllers
{
  [Route("api/[controller]")]
  public class UltrasonicLiveDataController : Controller
  {
    private readonly IHCSR04 _ultrasonic;

    public UltrasonicLiveDataController(IHCSR04 ultrasonic)
    {
      _ultrasonic = ultrasonic;
    }
    // GET: api/<controller>
    [HttpGet]
    public IEnumerable<string> Get()
    {
      //string distance = _ultrasonic.GetDistance().ToString();
      string distance = _ultrasonic.GetDistance();
      Console.WriteLine(distance);
      return new string[] { distance };
    }
  }
}
