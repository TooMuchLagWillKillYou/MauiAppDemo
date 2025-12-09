using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MinimalAPI.Data;
using MinimalAPI.Data.Repositories;
using MinimalAPI.Dtos.Reservation;

namespace MinimalAPI.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class ReservationController(IReservationRepository reservations, ITableRepository tables) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await reservations.Query().ToListAsync());
    [HttpGet("{date:datetime}")]
    public async Task<IActionResult> GetByDate(DateTime date) => Ok(await reservations.GetByDate(date));
    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id) => Ok(await reservations.Get(id));
    [HttpPost]
    public async Task<IActionResult> Add([FromBody] ReservationDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var table = dto.TableId is null ? null : await tables.Get((int)dto.TableId);

        await reservations.Add(new Reservation
        {
            Name = dto.Name,
            Hour = dto.Hour,
            People = dto.People,
            Table = table,
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

            var table = dto.TableId is null ? null : await tables.Get((int)dto.TableId);

            var reservation = await reservations.Get(dto.Id);
            reservation.Name = dto.Name;
            reservation.Hour = dto.Hour;
            reservation.People = dto.People;
            reservation.Table = table;
            reservation.Notes = dto.Notes;

            var result = await reservations.Update(reservation);
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpPatch]
    public async Task<IActionResult> ChangeStatus([FromBody] ChangeReservationStatusDto dto)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var reservation = await reservations.Get(dto.Id);
            reservation.Status = dto.Status;

            var result = await reservations.Update(reservation);
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
            await reservations.Delete(id);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}