using Microsoft.AspNetCore.Mvc;
using MinimalAPI.Data.Repositories;
using MinimalAPI.Dtos;

namespace MinimalAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PizzaController(IPizzaRepository repository) : ControllerBase
{
   [HttpGet]
   public async Task<IActionResult> GetAll() => Ok(await repository.GetAll());
   [HttpPost]
   public async Task<IActionResult> Add([FromBody] PizzaDto dto)
   {
      if (!ModelState.IsValid) return BadRequest(ModelState);
      await repository.Add(dto);
      return Created();
   }
   [HttpPut]
   public async Task<IActionResult> Update([FromBody] PizzaDto dto)
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
         await repository.SoftDelete(id);
         return Ok();
      }
      catch (Exception e)
      {
         return BadRequest(e.Message);
      }
   }
}