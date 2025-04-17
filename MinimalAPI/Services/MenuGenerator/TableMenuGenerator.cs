using MinimalAPI.Common;

namespace MinimalAPI.Services.MenuGenerator;

public class TableMenuGenerator(MenuLanguage language) : BaseMenuGenerator(language)
{
    protected override void GetData()
        => throw new NotImplementedException();
    protected override void CreateCover()
        => throw new NotImplementedException();
    protected override void WriteTitle()
        => throw new NotImplementedException();
    protected override byte[] GeneratePdf()
        => throw new NotImplementedException();
}