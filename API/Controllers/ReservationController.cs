using Microsoft.AspNetCore.Mvc;
using Models;

namespace API.Controllers
{
    [ApiController]
    [Route("controller")]
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
        public IActionResult AddReservation(Reservation reservation)
        {
            try
            {
                _context.Reservations.Add(reservation);
                _context.SaveChanges();

                return CreatedAtAction(nameof(AddReservation), new { id = reservation.Id}, reservation);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }
    }
}
