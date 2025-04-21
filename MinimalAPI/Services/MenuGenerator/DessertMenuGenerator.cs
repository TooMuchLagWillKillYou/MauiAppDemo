using MinimalAPI.Common;
using MinimalAPI.Data.Repositories;

namespace MinimalAPI.Services.MenuGenerator;

public class DessertMenuGenerator(MenuLanguage language, IPizzaRepository repository) : BaseMenuGenerator(language, repository)
{
}