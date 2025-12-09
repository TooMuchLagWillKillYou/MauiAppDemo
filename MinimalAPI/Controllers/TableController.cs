using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MinimalAPI.Data.Repositories;
using MinimalAPI.Dtos;

namespace MinimalAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class TableController(ITableRepository repository) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetByDate(DateTime date) => Ok(await repository.GetByDate(date));

        [HttpGet]
        public async Task<IActionResult> GetTablesForDropdown() => Ok(await repository.Query()
                .Select(t => new TableForDropdownDto(t.Id, t.Description)).ToListAsync());
    }
}
