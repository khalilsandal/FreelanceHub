using System.Text.Json;
using FreelanceHub.Api.Models;

namespace FreelanceHub.Api.Services;

public class FreelancerService : IFreelancerService
{
    private readonly IWebHostEnvironment _environment;

    public FreelancerService(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public async Task<List<Freelancer>> GetFreelancersAsync()
    {
        var filePath = Path.Combine(
            _environment.ContentRootPath,
            "Data",
            "freelancers.json"
        );

        if (!File.Exists(filePath))
        {
            return new List<Freelancer>();
        }

        var json = await File.ReadAllTextAsync(filePath);

        return JsonSerializer.Deserialize<List<Freelancer>>(json)
               ?? new List<Freelancer>();
    }
}