using System;
using System.Collections.Generic;
using System.Device.Gpio;
using System.Linq;
using System.Threading.Tasks;

namespace WaterControlApi.Services.Interfaces
{
  public interface IGpioService
  {
    GpioController GetGpioControllerInstance();
  }
}
