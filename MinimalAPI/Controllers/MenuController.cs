using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using MinimalAPI.Common;
using MinimalAPI.Data.Repositories;
using MinimalAPI.Dtos;
using MinimalAPI.Services.MenuGenerator;

namespace MinimalAPI.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class MenuController(IPizzaRepository pizzaRepository, MenuFactory menuFactory) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> UploadFromExcel(IFormFile file)
    {
        try
        {
            using var stream = file.OpenReadStream();
            var workbook = new XLWorkbook(stream);
            var worksheet = workbook.Worksheet("pizze");

            var rowIndex = 2; // skip the header row
            var idCell = worksheet.Cell(rowIndex, "A");

            while (idCell.GetValue<int>() != -1)
            {
                var dto = new PizzaDto(
                    0,
                    worksheet.Cell(rowIndex, "B").GetValue<string>(),
                    worksheet.Cell(rowIndex, "D").GetValue<string>(),
                    worksheet.Cell(rowIndex, "F").GetValue<string>(),
                    worksheet.Cell(rowIndex, "G").GetValue<string>(),
                    worksheet.Cell(rowIndex, "C").GetValue<decimal>(),
                    (PizzaCategory)worksheet.Cell(rowIndex, "E").GetValue<int>(), 
                    null,
                    DateTime.Now
                );
                
                await pizzaRepository.Add(dto);
                
                idCell = worksheet.Cell(rowIndex, "A");
                rowIndex++;
            }
            return NoContent();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpPost]
    public IActionResult GenerateMenu(MenuGenerationOptions options)
    {
        var generatedMenus = menuFactory.GenerateMenu(options);
        return Ok();
    }
}