using MinimalAPI.Common;
using MinimalAPI.Data.Repositories;

namespace MinimalAPI.Services.MenuGenerator;

public abstract class BaseMenuGenerator(MenuLanguage language, IPizzaRepository repository)
{
    private readonly MenuLanguage _language = language;

    public byte[] Generate()
    {
        GetData();
        CreateCover();
        WriteTitle();
        return GeneratePdf();
    }

    protected virtual void GetData()
    {
        
    }
    protected abstract void CreateCover();
    protected abstract void WriteTitle();
    protected abstract byte[] GeneratePdf();
}