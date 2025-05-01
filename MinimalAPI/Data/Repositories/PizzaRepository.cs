using Microsoft.EntityFrameworkCore;
using MinimalAPI.Dtos;

namespace MinimalAPI.Data.Repositories;

public class PizzaRepository(ReservationDbContext context) : IPizzaRepository
{
    public async Task<List<PizzaDto>> GetAll()
    {
        return await context.Pizzas.Where(p => !p.IsDeleted)
            .Select(p => new PizzaDto(p.Id, p.Name, p.Ingredients, p.EnglishTranslation, p.GermanTranslation, 
                p.Price, p.Category, p.Page, p.Order, p.CreatedAt))
            .ToListAsync();
    }
    public async Task<PizzaDto?> GetByName(string name)
    {
        return await context.Pizzas
            .Where(p => !p.IsDeleted && p.Name == name)
            .Select(p => new PizzaDto(p.Id, p.Name, p.Ingredients, p.EnglishTranslation, p.GermanTranslation, p.Price,
                p.Category, p.Page, p.Order, p.CreatedAt))
            .FirstOrDefaultAsync();
    }
    public async Task<PizzaDto> Add(PizzaDto pizza)
    {
        var entity = new PizzaEntity();
        DtoToEntity(pizza, entity);
        context.Pizzas.Add(entity);
        await context.SaveChangesAsync();
        
        return EntityToDto(entity);
    }
    public async Task<PizzaDto> Update(PizzaDto pizza)
    {
        var entity = await context.Pizzas.FindAsync(pizza.Id);
        
        if (entity is null)
            throw new ArgumentException($"Could not update pizza {pizza.Id}");

        DtoToEntity(pizza, entity);
        context.Entry(entity).State = EntityState.Modified;
        await context.SaveChangesAsync();

        return EntityToDto(entity);
    }
    public async Task SoftDelete(int id)
    {
        var entity = await context.Pizzas.FindAsync(id);
        
        if (entity == null)
            throw new ArgumentException($"Could not delete pizza {id}");

        entity.IsDeleted = true;
        
        context.Entry(entity).State = EntityState.Modified;
        await context.SaveChangesAsync();
    }
    /// <summary>
    /// Check if a pizza with the given name already exists
    /// </summary>
    public async Task<bool> Exists(string name)
        => await context.Pizzas.AnyAsync(p => p.Name == name);
    private static void DtoToEntity(PizzaDto d, PizzaEntity e)
    {
        e.Id = d.Id;
        e.Name = d.Name;
        e.Ingredients = d.Ingredients;
        e.EnglishTranslation = d.EnglishTranslation;
        e.GermanTranslation = d.GermanTranslation;
        e.Price = d.Price;
        e.Category = d.Category;
        e.Price = d.Price;
        e.CreatedAt = d.CreatedAt;
    }
    private static PizzaDto EntityToDto(PizzaEntity e)
        => new PizzaDto(
            e.Id, 
            e.Name, 
            e.Ingredients, 
            e.EnglishTranslation,
            e.GermanTranslation,
            e.Price, 
            e.Category, 
            e.Page, 
            e.Order,
            e.CreatedAt);
}