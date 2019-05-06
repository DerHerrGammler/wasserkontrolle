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
  public class RGBLedGetColorController : ControllerBase
  {
    private readonly ApplicationDbContext _context;

    public RGBLedGetColorController(ApplicationDbContext applicationDbContext)
    {
      _context = applicationDbContext;
    }

    // GET: api/RGBLedGetColor/5
    [HttpGet("{id}", Name = "Get")]
    public ActionResult Get(int id)
    {
      var rgbLed = _context.RGBLeds
        .Where(r => r.Id == id)
        .SingleOrDefault();
      if (rgbLed != null)
        return new JsonResult(rgbLed.Color);
      else
        return NotFound();
    }
  }
}
