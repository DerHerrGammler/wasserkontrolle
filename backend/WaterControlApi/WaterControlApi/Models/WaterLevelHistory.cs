using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaterControlApi.Models
{
  public class WaterLevelHistory
  {
    public int Id { get; set; }
    public string SenesorName { get; set; }
    public double WaterLevelValue { get; set; }
    public DateTime TimeStamp { get; set; }
  }
}
