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
        public async Task<IActionResult> GetAll() => Ok(await repository.Query().ToListAsync());

        [HttpGet]
        public async Task<IActionResult> GetTablesForDropdown() => Ok(await repository.Query()
                .Select(t => new TableForDropdownDto(t.Id, t.Description)).ToListAsync());
    }
}
