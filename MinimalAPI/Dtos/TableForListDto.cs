using MinimalAPI.Common;

namespace MinimalAPI.Dtos
{
    public record TableForListDto(int Id, string Description, TableStatus status);
}
