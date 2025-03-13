using MinimalAPI.Dtos;

namespace MinimalAPI.Data;

public interface IPizzaRepository
{
    Task<List<PizzaDto>> GetAll();
    Task<PizzaDto> Add(PizzaDto pizza);
    Task<PizzaDto> Update(PizzaDto pizza);
    Task SoftDelete(int id);
}