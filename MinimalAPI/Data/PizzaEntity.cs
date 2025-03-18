using System.ComponentModel.DataAnnotations.Schema;
using MinimalAPI.Common;

namespace MinimalAPI.Data;

public class PizzaEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Ingredients { get; set; }
    [Column(TypeName="money")]
    public decimal Price { get; set; }
    public PizzaCategory Category { get; set; }
    public int? Page { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; }
}