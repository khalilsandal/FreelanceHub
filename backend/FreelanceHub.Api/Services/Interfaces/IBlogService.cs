using FreelanceHub.Api.Models;

namespace FreelanceHub.Api.Services;

public interface IBlogService
{
    Task<List<Blog>> GetBlogsAsync();
}