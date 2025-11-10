using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MinimalAPI.Common;
using MinimalAPI.Data;
using MinimalAPI.Data.Repositories;
using MinimalAPI.Services.MenuGenerator;

namespace MinimalAPI.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class MenuController(IMenuItemRepository menuItemRepository, IMenuItemCategoryRepository menuItemCategoryRepository,
    IMenuRepository menuRepository, MenuFactory menuFactory) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> UploadFromExcel(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded or file is empty.");

        try
        {
            await using var stream = file.OpenReadStream();
            var workbook = new XLWorkbook(stream);
            var sheet = workbook.Worksheet(1);
            var usedRows = sheet.RowsUsed().Skip(1);

            var allMenus = menuRepository.Query().ToList();
            var allCategories = menuItemCategoryRepository.Query().ToDictionary(c => c.Id);
            var existingItems = menuItemRepository.Query().Include(e => e.Menus).ToDictionary(i => i.Name);

            int added = 0, updated = 0;

            foreach (var row in usedRows)
            {
                try
                {
                    var name = row.Cell("B").GetValue<string>();
                    var ingredients = row.Cell("C").GetValue<string?>();
                    var englishTranslation = row.Cell("D").GetValue<string?>();
                    var germanTranslation = row.Cell("E").GetValue<string?>();
                    var firstPrice = row.Cell("F").GetValue<decimal>();
                    var secondPrice = row.Cell("G").GetValue<decimal?>();
                    var order = row.Cell("H").GetValue<int?>();
                    var sectionId = row.Cell("I").GetValue<int>();
                    var menuFormats = row.Cell("L").GetValue<string>().Split(',').Select(i => Convert.ToInt32(i)).ToList();

                    var menus = allMenus.Where(m => menuFormats.Contains(m.Id)).ToList();

                    if (!allCategories.TryGetValue(sectionId, out var section))
                        continue;

                    if (existingItems.TryGetValue(name, out var menuItem))
                    {
                        menuItem.Name = name;
                        menuItem.Ingredients = ingredients;
                        menuItem.EnglishTranslation = englishTranslation;
                        menuItem.GermanTranslation = germanTranslation;
                        menuItem.FirstPrice = firstPrice;
                        menuItem.SecondPrice = secondPrice;
                        menuItem.Order = order;
                        menuItem.Category = section;

                        menuItem.Menus.Clear();
                        foreach (var m in menus)
                            menuItem.Menus.Add(m);

                        menuItem.UpdatedAt = DateTime.UtcNow;
                        await menuItemRepository.Update(menuItem);
                        updated++;
                    }
                    else
                    {
                        await menuItemRepository.Add(new MenuItem
                        {
                            Name = name,
                            Ingredients = ingredients,
                            EnglishTranslation = englishTranslation,
                            GermanTranslation = germanTranslation,
                            FirstPrice = firstPrice,
                            SecondPrice = secondPrice,
                            Order = order,
                            Category = section,
                            Menus = menus,
                            CreatedAt = DateTime.UtcNow
                        });
                        added++;
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest($"Error on row {row.RowNumber()}: {ex.Message}");
                }
            }
            return Ok(new { added, updated });
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An unexpected error occurred while processing the file.");
        }
    }
    [HttpGet]
    public async Task<IActionResult> GetHistoricalMenuItems(DateTime from, DateTime to)
        => Ok(await menuItemRepository.QueryTemporal(from, to).ToListAsync());
    [HttpPost]
    public IActionResult GenerateMenu(MenuGenerationOptions options)
    {
        string fileName = "";
        byte[] result = new byte[0];
        var generatedMenus = menuFactory.GenerateMenu(options);
        foreach (var menu in generatedMenus)
        {
            fileName = menu.Key;
            result = menu.Value;
        }
        return File(result, "application/pdf", fileName);
    }
}