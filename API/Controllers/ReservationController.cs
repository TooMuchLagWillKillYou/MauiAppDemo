using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController : Controller
    {
        TableDbContext _context;

        public ReservationController(TableDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetReservations")]
        public IEnumerable<Reservation> GetReservations()
        {
            return _context.Reservations.ToList();
        }

        [HttpPost]
        public IActionResult AddReservation([FromBody]Reservation reservation)
        {
            _context.Reservations.Add(reservation);
             _context.SaveChangesAsync();

            return CreatedAtAction(nameof(AddReservation), new { id = reservation.Id }, reservation);
        }

        // CONVERT TO PATCH??
        [HttpPut("{id}")]
        public async Task<IActionResult> EditReservation(int id, Reservation editedReservation)
        {
            if (id != editedReservation.Id)
                return BadRequest();

            _context.Entry(editedReservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(id))
                    return NotFound();
                else
                    throw;
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            Reservation r = await _context.Reservations.FindAsync(id);

            if (r == null)
                return NotFound();

            _context.Reservations.Remove(r);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReservationExists(long id)
        {
            return _context.Reservations.Any(e => e.Id == id);
        }
    }
}
