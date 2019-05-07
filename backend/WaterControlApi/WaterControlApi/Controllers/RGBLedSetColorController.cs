using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Device.Gpio;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterControlApi.Services;
using WaterControlApi.Services.Interfaces;
using WaterControlApi.Data;
using WaterControlApi.Models;
using Microsoft.AspNetCore.Cors;

namespace WaterControlApi.Controllers
{
  [EnableCors("AllowOrigin")]
  [Route("api/[controller]")]
  [ApiController]
  public class RGBLedSetColorController : ControllerBase
  {
    private readonly IGpioService _gpioService;
    private readonly ApplicationDbContext _context;

    public RGBLedSetColorController(IGpioService gpioService, ApplicationDbContext context)
    {
      _gpioService = gpioService;
      _context = context;
    }

    // Put: api/RGBLedSetColor/1/green
    [HttpPut("{id}/{color}", Name = "PutColor")]
    public IActionResult PutColor(int id, string color)
    {
      var rgbLed = _context.RGBLeds
        .Where(r => r.Id == id)
        .SingleOrDefault();
      if (rgbLed != null)
      {
        rgbLed.Color = color;
        _context.Update(rgbLed);
        _context.SaveChanges();
        this.SetColor(color, rgbLed);
      }
      else
      {
        return NotFound();
      }
      return Ok();
    }

    /// <summary>
    ///  Supported colors are red, blue, green, yellow, cyan, magenta, white.
    ///  Falsche Farbe schaltet die Led aus.
    /// </summary>
    /// <param name="color"></param>
    /// <param name="led"></param>
    private void SetColor(string color, RGBLed led)
    {
      int r = led.RedPin;
      int g = led.GreenPin;
      int b = led.BluePin;

      var gpio = _gpioService.GetGpioControllerInstance();

      if (!gpio.IsPinOpen(r))
      {
        gpio.OpenPin(r);
        if (gpio.IsPinModeSupported(r, PinMode.Output))
          gpio.SetPinMode(r, PinMode.Output);
      }

      if (!gpio.IsPinOpen(g))
      {
        gpio.OpenPin(g);
        if (gpio.IsPinModeSupported(g, PinMode.Output))
          gpio.SetPinMode(g, PinMode.Output);
      }

      if (!gpio.IsPinOpen(b))
      {
        gpio.OpenPin(b);
        if (gpio.IsPinModeSupported(b, PinMode.Output))
          gpio.SetPinMode(b, PinMode.Output);
      }

      if (color == "red")
      {
        gpio.Write(r, PinValue.High);
        gpio.Write(g, PinValue.Low);
        gpio.Write(b, PinValue.Low);
      }
      else if (color == "green")
      {
        gpio.Write(g, PinValue.High);
        gpio.Write(r, PinValue.Low);
        gpio.Write(b, PinValue.Low);
      }
      else if (color == "blue")
      {
        gpio.Write(b, PinValue.High);
        gpio.Write(g, PinValue.Low);
        gpio.Write(r, PinValue.Low);
      }
      else if (color == "yellow")
      {
        gpio.Write(b, PinValue.Low);
        gpio.Write(g, PinValue.High);
        gpio.Write(r, PinValue.High);
      }
      else if (color == "cyan")
      {
        gpio.Write(b, PinValue.High);
        gpio.Write(g, PinValue.High);
        gpio.Write(r, PinValue.Low);
      }
      else if (color == "magenta")
      {
        gpio.Write(b, PinValue.High);
        gpio.Write(g, PinValue.Low);
        gpio.Write(r, PinValue.High);
      }
      else if (color == "white")
      {
        gpio.Write(b, PinValue.High);
        gpio.Write(g, PinValue.High);
        gpio.Write(r, PinValue.High);
      }
      else
      {
        gpio.Write(b, PinValue.Low);
        gpio.Write(g, PinValue.Low);
        gpio.Write(r, PinValue.Low);
      }


    }
  }
}
