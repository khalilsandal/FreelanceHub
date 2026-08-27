using System.Text.Json;
using FreelanceHub.Api.Models;

namespace FreelanceHub.Api.Services;

public class BlogService : IBlogService
{
    private readonly IWebHostEnvironment _environment;

    public BlogService(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public async Task<List<Blog>> GetBlogsAsync()
    {
        var filePath = Path.Combine(
            _environment.ContentRootPath,
            "Data",
            "blogs.json"
        );

        if (!File.Exists(filePath))
        {
            return new List<Blog>();
        }

        var json = await File.ReadAllTextAsync(filePath);

        return JsonSerializer.Deserialize<List<Blog>>(json)
               ?? new List<Blog>();
    }
}