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
        public async Task<IActionResult> GetByDate(DateOnly date) => Ok(await repository.GetByDate(date));

        [HttpGet]
        public async Task<IActionResult> GetTablesForDropdown() => Ok(await repository.Query()
                .Select(t => new TableForDropdownDto(t.Id, t.Description)).ToListAsync());

        [HttpGet]
        public async Task<IActionResult> GetTablesMapSnapshot(DateOnly from, DateOnly to)
            => Ok(await repository.QueryTemporal(from, to));
    }
}
