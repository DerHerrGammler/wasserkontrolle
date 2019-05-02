using System;
using System.Device.Gpio;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using WaterControlApi.Services.Interfaces;
using System.Diagnostics;
using System.IO;


namespace WaterControlApi.Services
{
  /// <summary>
  /// Service um auf den Ultraschallsensor zu zugreifen.
  /// </summary>
  public class HCSR04 : IHCSR04
  {
    public HCSR04()
    { }

    public string GetDistance()
    {
      var process = new Process()
      {
        StartInfo = new ProcessStartInfo
        {
          FileName = "python",
          Arguments = $"Ultrasonic.py",
          RedirectStandardOutput = true,
          UseShellExecute = false,
          CreateNoWindow = true,
        }
      };
      process.Start();
      string distance = process.StandardOutput.ReadToEnd();
      process.WaitForExit();
      return distance;
    }
  }
}
