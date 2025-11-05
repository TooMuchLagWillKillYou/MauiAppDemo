using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using MinimalAPI.Common;
using MinimalAPI.Data;
using MinimalAPI.Data.Repositories;
using MinimalAPI.Dtos;
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
        try
        {
            await using var stream = file.OpenReadStream();
            var workbook = new XLWorkbook(stream);
            var sheet = workbook.Worksheet(1);
            var usedRows = sheet.RowsUsed(x => x.RowNumber() > 1);

            foreach (var row in usedRows)
            {
                var id = row.Cell("A").GetValue<int>();
                var name = row.Cell("B").GetValue<string>();
                var ingredients = row.Cell("C").GetValue<string?>();
                var englishTranslation = row.Cell("D").GetValue<string?>();
                var germanTranslation = row.Cell("E").GetValue<string?>();
                var firstPrice = row.Cell("F").GetValue<decimal>();
                var secondPrice = row.Cell("G").GetValue<decimal?>();
                var order = row.Cell("H").GetValue<int?>();
                var sectionId = row.Cell("I").GetValue<int>();
                var menuFormats = row.Cell("L").GetValue<string>().Split(',').Select(i => Convert.ToInt32(i)).ToList();

                var menus = new List<Menu>();

                foreach (var format in menuFormats)
                {
                    var menu = await menuRepository.GetById(format);

                    if (menu == null)
                    {
                        return BadRequest($"Menu with ID {format} does not exist.");
                    }

                    menus.Add(menu);
                }

                var sectionDto = await menuItemCategoryRepository.GetById(sectionId);
                var section = new MenuItemCategory { Id = sectionDto.Id, Name = sectionDto.Name };

                if (await menuItemRepository.Exists(id))
                {
                    var menuItem = await menuItemRepository.GetById(id);
                    menuItem.Name = name;
                    menuItem.Ingredients = ingredients;
                    menuItem.EnglishTranslation = englishTranslation;
                    menuItem.GermanTranslation = germanTranslation;
                    menuItem.FirstPrice = firstPrice;
                    menuItem.SecondPrice = secondPrice;
                    menuItem.Order = order;
                    menuItem.Category = section;
                    menuItem.Menus = menus;
                    menuItem.UpdatedAt = DateTime.Now;
                    await menuItemRepository.Update(menuItem);
                }
                else
                {
                    var menuItem = new MenuItem
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
                        CreatedAt = DateTime.Now
                    };
                    await menuItemRepository.Add(menuItem);
                }
            }

            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }

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