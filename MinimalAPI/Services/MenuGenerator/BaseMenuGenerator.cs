using iText.Html2pdf;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using MinimalAPI.Common;

namespace MinimalAPI.Services.MenuGenerator;

public abstract class BaseMenuGenerator(MenuLanguage language)
{
    private readonly MenuLanguage _language = language;
    public string Html { get; set; }
    public byte[] Generate()
    {
        GetData();
        WriteCoverHtml();
        WriteTitlesHtml();
        // WritePizzasHtml();
        // WriteAperitifsHtml();
        // WriteBeverageHtml();
        // WriteBeersHtml();
        // WriteWinesHtml();
        return GeneratePdf();
    }

    protected virtual void GetData()
    {
    }
    protected virtual void WriteCoverHtml()
    {

    }
    protected virtual void WriteTitlesHtml()
    {

    }
    protected virtual byte[] GeneratePdf()
    {
        var htmlString = """
                         <div>Hello world</div>
                         """;
        using var stream = new MemoryStream();
        var writer = new PdfWriter(stream);
        var pdf = new PdfDocument(writer);
        pdf.SetDefaultPageSize(PageSize.A5);

        ConverterProperties props = new ConverterProperties();
        HtmlConverter.ConvertToPdf(htmlString, pdf, props);

        return stream.ToArray();
    }
}