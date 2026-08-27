using FreelanceHub.Api.Models;
using FreelanceHub.Api.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class JobsController : ControllerBase
{
    private readonly IJobService _jobService;

    public JobsController(IJobService jobService)
    {
        _jobService = jobService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Job>>> Get()
    {
        var jobs = await _jobService.GetJobsAsync();

        return Ok(jobs);
    }
}