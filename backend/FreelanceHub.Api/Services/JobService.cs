using System.Text.Json;
using FreelanceHub.Api.Models;

namespace FreelanceHub.Api.Services;

public class JobService : IJobService
{
    private readonly IWebHostEnvironment _environment;

    public JobService(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public async Task<List<Job>> GetJobsAsync()
    {
        var filePath = Path.Combine(
            _environment.ContentRootPath,
            "Data",
            "jobs.json"
        );

        if (!File.Exists(filePath))
        {
            return new List<Job>();
        }

        var json = await File.ReadAllTextAsync(filePath);

        return JsonSerializer.Deserialize<List<Job>>(json)
               ?? new List<Job>();
    }
}