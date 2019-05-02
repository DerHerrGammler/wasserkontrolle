using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Device.Gpio;
using WaterControlApi.Services.Interfaces;

namespace WaterControlApi.Services
{
  public class GpioService : IGpioService
  {
    private GpioController Gpio { get; set; }

    public GpioService()
    {
      Gpio = new GpioController(PinNumberingScheme.Logical);

    }

    public GpioController GetGpioControllerInstance()
    {
      return Gpio;
    }
  }
}
