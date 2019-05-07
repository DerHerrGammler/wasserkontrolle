using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaterControlApi.Models
{
  public class RGBLed
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Color { get; set; }
    public bool State { get; set; }
    public int RedPin { get; set; }
    public int GreenPin { get; set; }
    public int BluePin { get; set; }

    public Configuration Configuration { get; set; }

  }
}
