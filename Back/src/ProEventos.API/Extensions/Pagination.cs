using System.Text.Json;
using ProEventos.API.Models;

namespace ProEventos.API.Extensions;

public static class Pagination
{
    public static void AddPagination(this HttpResponse response, int currentPage, int itemsPerPage, int totalItems, int totalPages)
    {
        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        var pagination = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);

        var paginationHeader = JsonSerializer.Serialize(pagination, options);

        response.Headers["Pagination"] = paginationHeader;
        response.Headers["Access-Control-Expose-Headers"] = "Pagination";
    }
}
