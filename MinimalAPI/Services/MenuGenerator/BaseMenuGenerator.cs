using MinimalAPI.Common;

namespace MinimalAPI.Services.MenuGenerator;

public abstract class BaseMenuGenerator(MenuLanguage language)
{
    private readonly MenuLanguage _language = language;

    public byte[] Generate()
    {
        GetData();
        CreateCover();
        WriteTitle();
        return GeneratePdf();
    }

    protected abstract void GetData();
    protected abstract void CreateCover();
    protected abstract void WriteTitle();
    protected abstract byte[] GeneratePdf();
}