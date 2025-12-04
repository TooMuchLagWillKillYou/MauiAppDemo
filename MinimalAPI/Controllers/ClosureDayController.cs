using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MinimalAPI.Data;
using MinimalAPI.Data.Repositories;
using MinimalAPI.Dtos;

namespace MinimalAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ClosureDayController(IClosureDayRepository repository) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await repository.Query().ToListAsync());
        [HttpGet]
        public async Task<IActionResult> GetByMonth(int year, int month) => Ok(await repository.GetByMonth(year, month));
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] ClosureDayDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            await repository.Add(new ClosureDay
            {
                From = dto.From,
                To = dto.To,
                Reason = dto.Reason
            });
            return Created();
        }
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await repository.Delete(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
