using MinimalAPI.Common;
using MinimalAPI.Data.Repositories;

namespace MinimalAPI.Services.MenuGenerator;

public class MenuFactory(IPizzaRepository repository)
{
    public Dictionary<string, byte[]> GenerateMenu(MenuGenerationOptions options)
    {
        var result = new Dictionary<string, byte[]>();
        var today = DateOnly.FromDateTime(DateTime.Now);
        
        foreach (var format in options.Formats)
        {
            foreach (var language in options.Languages)
            {
                switch (format)
                {
                    case MenuType.Complete:
                        result.TryAdd($"Complete menu - {language} - {today}", new CompleteMenuGenerator(language, repository).Generate());
                        break;
                    case MenuType.Table:
                        result.TryAdd($"Table menu - {language} - {today}", new TableMenuGenerator(language, repository).Generate());
                        break;
                    case MenuType.TakeAway:
                        result.TryAdd($"TakeAway menu - {language} - {today}", new TakeAwayMenuGenerator(language, repository).Generate());
                        break;
                    case MenuType.Dessert:
                        result.TryAdd($"Dessert menu - {language} - {today}", new DessertMenuGenerator(language, repository).Generate());
                        break;
                }
            }
        }
        
        return result;
    }
}






