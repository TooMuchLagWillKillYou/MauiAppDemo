using Microsoft.EntityFrameworkCore;
using MinimalAPI.Dtos;

namespace MinimalAPI.Data.Repositories;

public class PizzaRepository(ReservationDbContext context) : IPizzaRepository
{
    private readonly ReservationDbContext _context = context;

    public async Task<List<PizzaDto>> GetAll()
    {
        return await _context.Pizzas.Where(p => !p.IsDeleted)
            .Select(p => new PizzaDto(p.Id, p.Name, p.Ingredients, p.Price, p.Type, p.Page, p.CreatedAt))
            .ToListAsync();
    }

    public async Task<PizzaDto> Add(PizzaDto pizza)
    {
        var entity = new PizzaEntity();
        DtoToEntity(pizza, entity);
        _context.Pizzas.Add(entity);
        await _context.SaveChangesAsync();
        
        return EntityToDto(entity);
    }

    public async Task<PizzaDto> Update(PizzaDto pizza)
    {
        var entity = await _context.Pizzas.FindAsync(pizza.Id);
        
        if (entity is null)
            throw new ArgumentException($"Could not update pizza {pizza.Id}");

        DtoToEntity(pizza, entity);
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return EntityToDto(entity);
    }

    public async Task SoftDelete(int id)
    {
        var entity = await _context.Pizzas.FindAsync(id);
        
        if (entity == null)
            throw new ArgumentException($"Could not delete pizza {id}");

        entity.IsDeleted = true;
        
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    private static void DtoToEntity(PizzaDto d, PizzaEntity e)
    {
        e.Id = d.Id;
        e.Name = d.Name;
        e.Ingredients = d.Ingredients;
        e.Price = d.Price;
        e.Type = d.Type;
        e.Price = d.Price;
        e.CreatedAt = d.CreatedAt;
    }

    private static PizzaDto EntityToDto(PizzaEntity e)
        => new PizzaDto(e.Id, e.Name, e.Ingredients, e.Price, e.Type, e.Page, e.CreatedAt);
    
}