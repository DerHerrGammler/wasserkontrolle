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
    public string SuccessColor { get; set; }
    public string WarningColor { get; set; }
    public string ErrorColor { get; set; }
    public int MeasuringIntervalTemperatur { get; set; }
    public int MeasuringIntervalWaterLevel { get; set; }
  }
}
