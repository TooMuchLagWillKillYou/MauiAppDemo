using Microsoft.AspNetCore.Mvc;
using MinimalAPI.Data.Repositories;
using MinimalAPI.Dtos;

namespace MinimalAPI.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class ReservationController(IReservationRepository repository) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await repository.GetAll());
    [HttpGet("{date:datetime}")]
    public async Task<IActionResult> GetByDate(DateTime date) => Ok(await repository.GetByDate(date));
    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id) => Ok(await repository.Get(id));
    [HttpPost]
    public async Task<IActionResult> Add([FromBody] ReservationDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        await repository.Add(dto);
        return Created();
    }
    [HttpPut]
    public async Task<IActionResult> Update([FromBody] ReservationDto dto)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await repository.Update(dto);
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
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