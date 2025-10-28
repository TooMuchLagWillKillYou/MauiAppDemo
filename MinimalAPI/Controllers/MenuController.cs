using ClosedXML.Excel;
using DocumentFormat.OpenXml.Drawing.Diagrams;
using DocumentFormat.OpenXml.Wordprocessing;
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
    IMenuItemSubCategoryRepository menuItemSubCategoryRepository, IMenuRepository menuRepository, MenuFactory menuFactory) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> UploadFromExcel2(IFormFile file)
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
                var ingredients = row.Cell("C").GetValue<string>();
                var englishTranslation = row.Cell("D").GetValue<string>();
                var germanTranslation = row.Cell("E").GetValue<string>();
                var firstPrice = row.Cell("F").GetValue<decimal>();
                var secondPrice = row.Cell("G").GetValue<decimal>();
                var order = row.Cell("H").GetValue<int>();
                var menuSection = row.Cell("I").GetValue<int>();
                var menuFormats = row.Cell("L").GetValue<string>().Split(',').Select(i => Convert.ToInt32(i)).ToList();

                if (await menuItemRepository.ExistsAsync(id))
                {
                    var menuItem = await menuItemRepository.GetByIdAsync(id);
                    menuItem.Name = name;
                    menuItem.Ingredients = ingredients;
                    menuItem.EnglishTranslation = englishTranslation;
                    menuItem.GermanTranslation = germanTranslation;
                    menuItem.FirstPrice = firstPrice;
                    menuItem.SecondPrice = secondPrice;
                    menuItem.Order = order;
                    menuItem.CategoryId = menuSection;
                    menuItem.Menus = menuFormats.Select(m => new Menu { Id = m }).ToList();
                    menuItem.UpdatedAt = DateTime.Now;
                    await menuItemRepository.UpdateAsync(menuItem);
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
                        CategoryId = menuSection,
                        Menus = menuFormats.Select(m => new Menu { Id = m }).ToList(),
                        CreatedAt = DateTime.Now
                    };
                    await menuItemRepository.AddAsync(menuItem);
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
    public async Task<IActionResult> UploadFromExcel(IFormFile file)
    {
        await using var stream = file.OpenReadStream();
        var workbook = new XLWorkbook(stream);

        var worksheet = workbook.Worksheet(1);
        var rowIndex = 2;
        var idCell = worksheet.Cell(rowIndex, "A");

        while (idCell.GetValue<int>() != -1)
        {
            var id = worksheet.Cell(rowIndex, "A").GetValue<int>();
            var name = worksheet.Cell(rowIndex, "B").GetValue<string>();
            var ingredients = worksheet.Cell(rowIndex, "C").GetValue<string>();
            var englishTranslation = worksheet.Cell(rowIndex, "D").GetValue<string>();
            var germanTranslation = worksheet.Cell(rowIndex, "E").GetValue<string>();
            var firstPrice = worksheet.Cell(rowIndex, "F").GetValue<decimal>();
            var secondPrice = worksheet.Cell(rowIndex, "G").GetValue<decimal?>();
            var order = worksheet.Cell(rowIndex, "H").GetValue<int>();
            var categoryId = worksheet.Cell(rowIndex, "I").GetValue<int>();
            var category = await menuItemCategoryRepository.Get(categoryId);
            //var subCategoryName = worksheet.Cell(rowIndex, "J").GetValue<string?>();
            //var subCategory = await menuItemSubCategoryRepository.GetByNameAsync(subCategoryName);
            var menusIds = worksheet.Cell(rowIndex, "L").GetValue<string>().Split(',').Select(i  => Convert.ToInt32(i)).ToList();
            var menuDtos = new List<MenuDto>();

            foreach (var menuId in menusIds)
            {
                var menuDto = await menuRepository.Get(menuId);
                menuDtos.Add(menuDto);
            }
            
            if (await menuItemRepository.ExistsAsync(id))
            {
                var menuItem = await menuItemRepository.GetByIdAsync(id);
                menuItem.Name = name;
                menuItem.Ingredients = ingredients;
                menuItem.EnglishTranslation = englishTranslation;
                menuItem.GermanTranslation = germanTranslation;
                menuItem.FirstPrice = firstPrice;
                menuItem.SecondPrice = secondPrice;
                menuItem.Order = order;
                menuItem.CategoryId = category.Id;
                //menuItem.SubCategoryId = subCategory.Id;
                menuItem.Menus = menuDtos.Select(m => new Menu { Id = m.Id, Name = m.Name }).ToList();
                menuItem.UpdatedAt = DateTime.Now;
                await menuItemRepository.UpdateAsync(menuItem);
            }
            else
            {
                var menuItem = new MenuItem
                {
                    //Id = id,
                    Name = name,
                    Ingredients = ingredients,
                    EnglishTranslation = englishTranslation,
                    GermanTranslation = germanTranslation,
                    FirstPrice = firstPrice,
                    SecondPrice = secondPrice,
                    Order = order,
                    CategoryId = category.Id,
                    //SubCategoryId = subCategory.Id,
                    Menus = menuDtos.Select(m => new Menu { Name = m.Name }).ToList(),
                    CreatedAt = DateTime.Now
                };
                await menuItemRepository.AddAsync(menuItem);
            }
            
            idCell = worksheet.Cell(rowIndex, "A");
            rowIndex++;
        }
        
        return NoContent();
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