using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterControlApi.Data;

namespace WaterControlApi.Controllers
{
  [EnableCors("AllowOrigin")]
  [Route("api/[controller]")]
  [ApiController]
  public class WaterLevelHistoryController : ControllerBase
  {
    private readonly ApplicationDbContext _context;

    public WaterLevelHistoryController(ApplicationDbContext context)
    {
      _context = context;
    }
    // GET: api/WaterLevelHistory
    [HttpGet()]
    public IActionResult Get()
    {
      // List<string[]> data = new List<string[]>() { new string[] { "234.47", DateTime.UtcNow.ToString("o") }, new string[] { "145.47", DateTime.UtcNow.ToString("o") }, new string[] { "345.47", DateTime.UtcNow.ToString("o") }, };
      var data = _context.TemperatureHistories.Select(x => new
      {
        p1 = x.TemperaturValue,
        p2 = x.TimeStamp.ToString("o")
      }).ToList();
      return new JsonResult(data.ToArray());
    }
  }
}
