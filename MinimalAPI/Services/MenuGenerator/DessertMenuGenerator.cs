using MinimalAPI.Common;
using MinimalAPI.Data.Repositories;

namespace MinimalAPI.Services.MenuGenerator;

public class DessertMenuGenerator(MenuLanguage language, IPizzaRepository repository) : BaseMenuGenerator(language, repository)
{
    protected override void GetData()
        =>throw new NotImplementedException();
    protected override void CreateCover()
        =>throw new NotImplementedException();
    protected override void WriteTitle()
        =>throw new NotImplementedException();
    protected override byte[] GeneratePdf()
        =>throw new NotImplementedException();
}