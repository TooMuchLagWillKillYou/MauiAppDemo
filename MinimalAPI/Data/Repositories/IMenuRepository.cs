using MinimalAPI.Common;
using MinimalAPI.Dtos;

namespace MinimalAPI.Data.Repositories;

public interface IMenuRepository
{
    Task<MenuDto> GetMenu(int id);
    Task<MenuDto> GetMenu(MenuType type);
    Task<List<MenuDto>> GetAll();
}