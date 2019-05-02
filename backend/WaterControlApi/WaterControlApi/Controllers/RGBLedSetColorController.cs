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

namespace WaterControlApi.Controllers
{
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
    [HttpPut("{id}/{color}", Name = "Put")]
    public bool PutColor(int id, string color)
    {
      var rgbLed = _context.RGBLeds
        .SingleOrDefault(r => r.Id == id);
      if (rgbLed != null)
      {
        rgbLed.Color = color;
        _context.Update(rgbLed);
        _context.SaveChanges();
        this.SetColor(color, rgbLed);
      }
      else
        return false;
      return true;
    }

    /// <summary>
    ///  Supported colors are red, blue, green, yellow, cyan, magenta, white.
    ///  Falsche Farbe schaltet die Led aus.
    /// </summary>
    /// <param name="color"></param>
    /// <param name="r">pin number red</param>
    /// <param name="g">pin number green</param>
    /// <param name="b">pin number blue</param>
    private void SetColor(string color, RGBLed led)
    {
      int r = led.RedPin;
      int g = led.GreenPin;
      int b = led.BluePin;

      var gpio = _gpioService.GetGpioControllerInstance();

      if (!gpio.IsPinOpen(r))
        if (gpio.IsPinModeSupported(r, PinMode.Output))
          gpio.OpenPin(r, PinMode.Output);

      if (!gpio.IsPinOpen(g))
        if (gpio.IsPinModeSupported(g, PinMode.Output))
          gpio.OpenPin(g, PinMode.Output);

      if (!gpio.IsPinOpen(b))
        if (gpio.IsPinModeSupported(b, PinMode.Output))
          gpio.OpenPin(b, PinMode.Output);

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
