using MinimalAPI.Data.Repositories;
using System.ComponentModel.DataAnnotations.Schema;

namespace MinimalAPI.Data;

public class MenuItem : IEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Ingredients { get; set; }
    public string? EnglishTranslation { get; set; }
    public string? GermanTranslation { get; set; }
    [Column(TypeName = "money")]
    public decimal FirstPrice { get; set; }
    [Column(TypeName = "money")]
    public decimal? SecondPrice { get; set; }
    public int? Page { get; set; }
    public int? Order { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    
    public int CategoryId { get; set; }
    public MenuItemCategory Category { get; set; }
    public int? SubCategoryId { get; set; }
    public MenuItemSubCategory? SubCategory { get; set; }
    public ICollection<Menu> Menus { get; set; }
}