using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaterControlApi.Services.Interfaces
{
  public interface IHCSR04
  {
    /// <summary>
    /// Ermittel die gemessene Distanz des Ultraschallsensors
    /// </summary>
    /// <returns>Distanz Wert</returns>
    string GetDistance();
  }
}
