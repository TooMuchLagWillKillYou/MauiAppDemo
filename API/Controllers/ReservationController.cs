using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ReservationController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
