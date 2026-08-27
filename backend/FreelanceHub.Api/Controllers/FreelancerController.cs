using FreelanceHub.Api.Models;
using FreelanceHub.Api.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class FreelancerController : ControllerBase
{
    private readonly IFreelancerService _freelancerService;

    public FreelancerController(IFreelancerService freelancerService)
    {
        _freelancerService = freelancerService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Freelancer>>> Get()
    {
        var freelancers = await _freelancerService.GetFreelancersAsync();

        return Ok(freelancers);
    }
}