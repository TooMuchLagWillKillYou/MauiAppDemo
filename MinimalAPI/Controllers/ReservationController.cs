using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MinimalAPI.Common;
using MinimalAPI.Data;
using MinimalAPI.Data.Repositories;
using MinimalAPI.Dtos;

namespace MinimalAPI.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class ReservationController(IReservationRepository repository) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await repository.Query().ToListAsync());
    [HttpGet("{date:datetime}")]
    public async Task<IActionResult> GetByDate(DateTime date) => Ok(await repository.GetByDate(date));
    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id) => Ok(await repository.Get(id));
    [HttpPost]
    public async Task<IActionResult> Add([FromBody] ReservationDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        await repository.Add(new Reservation
        {
            Name = dto.Name,
            Hour = dto.Hour,
            People = dto.People,
            Table = dto.Table,
            Notes = dto.Notes,
        });
        return Created();
    }
    [HttpPut]
    public async Task<IActionResult> Update([FromBody] ReservationDto dto)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var reservation = await repository.Get(dto.Id);
            reservation.Name = dto.Name;
            reservation.Hour = dto.Hour;
            reservation.People = dto.People;
            reservation.Table = dto.Table;
            reservation.Notes = dto.Notes;

            var result = await repository.Update(reservation);
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpPatch("{id:int}/status")]
    public async Task<IActionResult> ChangeStatus(int id, [FromBody]ChangeStatusDto dto)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var reservation = await repository.Get(id);
            reservation.Status = dto.Status;

            var result = await repository.Update(reservation);
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e);
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