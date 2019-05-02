using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WaterControlApi.Data;
using WaterControlApi.Models;

namespace WaterControlApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RGBLedsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RGBLedsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/RGBLeds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RGBLed>>> GetRGBLeds()
        {
            return await _context.RGBLeds.ToListAsync();
        }

        // GET: api/RGBLeds/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RGBLed>> GetRGBLed(int id)
        {
            var rGBLed = await _context.RGBLeds.FindAsync(id);

            if (rGBLed == null)
            {
                return NotFound();
            }

            return rGBLed;
        }

        // PUT: api/RGBLeds/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRGBLed(int id, RGBLed rGBLed)
        {
            if (id != rGBLed.Id)
            {
                return BadRequest();
            }

            _context.Entry(rGBLed).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RGBLedExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RGBLeds
        [HttpPost]
        public async Task<ActionResult<RGBLed>> PostRGBLed(RGBLed rGBLed)
        {
            _context.RGBLeds.Add(rGBLed);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRGBLed", new { id = rGBLed.Id }, rGBLed);
        }

        // DELETE: api/RGBLeds/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RGBLed>> DeleteRGBLed(int id)
        {
            var rGBLed = await _context.RGBLeds.FindAsync(id);
            if (rGBLed == null)
            {
                return NotFound();
            }

            _context.RGBLeds.Remove(rGBLed);
            await _context.SaveChangesAsync();

            return rGBLed;
        }

        private bool RGBLedExists(int id)
        {
            return _context.RGBLeds.Any(e => e.Id == id);
        }
    }
}
