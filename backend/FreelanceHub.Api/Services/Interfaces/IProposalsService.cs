using FreelanceHub.Api.Models;

namespace FreelanceHub.Api.Services;

public interface IProposalsService
{
    Task<List<Proposal>> GetProposalsAsync();

    Task<Proposal> CreateProposalAsync(Proposal proposal);
}