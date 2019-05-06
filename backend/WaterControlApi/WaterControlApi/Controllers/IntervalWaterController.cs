using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterControlApi.Data;
using WaterControlApi.Models;
using WaterControlApi.Services.Interfaces;

namespace WaterControlApi.Controllers
{
  [EnableCors("AllowOrigin")]
  [Route("api/[controller]")]
  [ApiController]
  public class IntervalWaterController : ControllerBase
  {


    private readonly ApplicationDbContext _context;
    private readonly IHCSR04 _hCSR04;
    public IntervalWaterController(ApplicationDbContext context, IHCSR04 hCSR04)
    {
      _context = context;
      _hCSR04 = hCSR04;
    }
    // PUT: api/IntervalWater
    [HttpPut()]
    public void Put()
    {
      _context.WaterLevelHistories.Add(new WaterLevelHistory() { SenesorName = "waterLevel", WaterLevelValue = double.Parse(_hCSR04.GetDistance()), TimeStamp = DateTime.UtcNow });
      _context.SaveChanges();
    }

  }
}