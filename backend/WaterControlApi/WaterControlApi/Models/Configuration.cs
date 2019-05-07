using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaterControlApi.Models
{
  public class Configuration
  {
    public Configuration()
    { }

    public int Id { get; set; }
    public string HighColor { get; set; }
    public string MediumColor { get; set; }
    public string LowColor { get; set; }
    public double HighValue { get; set; }
    public double LowValue { get; set; }
    public int MeasuringIntervalTemperatur { get; set; }
    public int MeasuringIntervalWaterLevel { get; set; }

    public List<RGBLed> RGBLeds { get; set; } 
  }
}
