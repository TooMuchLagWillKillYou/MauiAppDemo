using MinimalAPI.Dtos;

namespace MinimalAPI.Data.Repositories;

public interface IPizzaRepository
{
    Task<List<PizzaDto>> GetAll();
    Task<PizzaDto?> GetByName(string name);
    Task<PizzaDto> Add(PizzaDto pizza);
    Task<PizzaDto> Update(PizzaDto pizza);
    Task SoftDelete(int id);
    Task<bool> Exists(string name);
}