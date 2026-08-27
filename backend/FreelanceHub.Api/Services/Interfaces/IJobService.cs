using FreelanceHub.Api.Models;

namespace FreelanceHub.Api.Services;

public interface IJobService
{
    Task<List<Job>> GetJobsAsync();
}