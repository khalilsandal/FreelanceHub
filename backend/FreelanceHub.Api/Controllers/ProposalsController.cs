//getProposals
//submitProposal

using FreelanceHub.Api.Models;
using FreelanceHub.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace FreelanceHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProposalsController : ControllerBase
{
    private readonly IProposalsService _proposalsService;

    public ProposalsController(IProposalsService proposalsService)
    {
        _proposalsService = proposalsService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Proposal>>> Get()
    {
        var proposals = await _proposalsService.GetProposalsAsync();

        return Ok(proposals);
    }

    [HttpPost]
    public async Task<ActionResult<Proposal>> CreateProposal(
        [FromBody] Proposal proposal)
    {
        try
        {
            var createdProposal =
                await _proposalsService.CreateProposalAsync(proposal);

            return Ok(createdProposal);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new
            {
                message = ex.Message
            });
        }
    }
}