using Microsoft.EntityFrameworkCore;
using MinimalAPI.Common;
using MinimalAPI.Dtos;

namespace MinimalAPI.Data.Repositories;

public class MenuRepository(ReservationDbContext context) : IMenuRepository
{
    public async Task<MenuDto> Get(int id)
    {
        var entity = await context.Menus.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        
        if (entity is null)
            throw new ArgumentException($"Couldn't find a menu with id: {id}");

        return EntityToDto(entity);
    }
    public async Task<MenuDto> GetMenu(MenuType type) => await Get((int)type);
    public async Task<List<MenuDto>> GetAll() => await context.Menus.Select(x => EntityToDto(x)).ToListAsync();

    private static void DtoToEntity(MenuDto d, Menu e) { e.Id = d.Id; e.Name = d.Name; }
    private static MenuDto EntityToDto(Menu e) => new MenuDto(e.Id, e.Name);
}