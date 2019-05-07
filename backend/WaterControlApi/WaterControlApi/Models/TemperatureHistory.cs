using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaterControlApi.Models
{
  public class TemperatureHistory
  {
    public int Id { get; set; }
    public string SenesorName { get; set; }
    public string SensorId { get; set; }
    public double TemperaturValue { get; set; }
    public DateTime TimeStamp { get; set; }
  }
}
