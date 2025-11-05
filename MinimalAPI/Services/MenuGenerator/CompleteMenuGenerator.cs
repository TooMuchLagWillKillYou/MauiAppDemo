using MinimalAPI.Common;
using MinimalAPI.Data.Repositories;

namespace MinimalAPI.Services.MenuGenerator;

public class CompleteMenuGenerator(MenuLanguage language) : BaseMenuGenerator(language)
{
}