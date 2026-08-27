using FreelanceHub.Api.Models;
using FreelanceHub.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace FreelanceHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogsController : ControllerBase
{
    private readonly IBlogService _blogService;

    public BlogsController(IBlogService blogService)
    {
        _blogService = blogService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Blog>>> Get()
    {
        var blogs = await _blogService.GetBlogsAsync();

        return Ok(blogs);
    }
}