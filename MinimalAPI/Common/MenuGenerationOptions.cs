namespace MinimalAPI.Common;

public class MenuGenerationOptions
{
    public IEnumerable<MenuLanguage> Languages { get; set; } 
    public IEnumerable<MenuType> Formats { get; set; } 
}