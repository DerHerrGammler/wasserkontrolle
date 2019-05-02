using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterControlApi.Data;

namespace WaterControlApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class RGBLedGetColorController : ControllerBase
  {
    private readonly ApplicationDbContext _context;

    // GET: api/RGBLedGetColor/5
    [HttpGet("{id}", Name = "Get")]
    public string Get(int id)
    {
      var rgbLed = _context.RGBLeds
        .SingleOrDefault(r => r.Id == id);
      if (rgbLed != null)
        return rgbLed.Color;
      else
        return "false";
    }
  }
}
