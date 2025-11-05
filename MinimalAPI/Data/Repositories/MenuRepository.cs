using MinimalAPI.Dtos;

namespace MinimalAPI.Data.Repositories;

public class MenuRepository(ReservationDbContext ctx) : Repository<Menu>(ctx), IMenuRepository
{
    //private static void DtoToEntity(MenuDto d, Menu e) { e.Id = d.Id; e.Name = d.Name; }
    //private static MenuDto EntityToDto(Menu e) => new MenuDto(e.Id, e.Name);
}