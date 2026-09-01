using FreelanceHub.Api.Services;
using System.Text.Json;
using FreelanceHub.Api.Models;
public class ProposalsService : IProposalsService
{
    private readonly IWebHostEnvironment _environment;
    public ProposalsService(IWebHostEnvironment environment)
    {
        _environment = environment;
    }
    public async Task<List<Proposal>> GetProposalsAsync()
    {
         var filePath = Path.Combine(
            _environment.ContentRootPath,
            "Data",
            "proposals.json"
        );

        if (!File.Exists(filePath))
        {
            return new List<Proposal>();
        }

        var json = await File.ReadAllTextAsync(filePath);

        return JsonSerializer.Deserialize<List<Proposal>>(json)
               ?? new List<Proposal>();
    }

    public async Task<Proposal> CreateProposalAsync(Proposal proposal)
    {
        var filePath = Path.Combine(
            _environment.ContentRootPath,
            "Data",
            "proposals.json"
        );

        var proposals = new List<Proposal>();

        if (File.Exists(filePath))
        {
            var json = await File.ReadAllTextAsync(filePath);

            proposals = JsonSerializer.Deserialize<List<Proposal>>(json)
                        ?? new List<Proposal>();
        }

        // Only one proposal per job
        if (proposals.Any(p =>
            p.JobId == proposal.JobId &&
            p.FreelancerId == proposal.FreelancerId
        ))
        {
            throw new InvalidOperationException(
                "A proposal has already been submitted for this job."
            );
        }

        // Generate new ID
        proposal.Id = proposals.Count > 0
            ? proposals.Max(p => p.Id) + 1
            : 1;

        proposal.Status = "pending";
        proposal.CreatedAt = DateTime.UtcNow;

        proposals.Add(proposal);

        var updatedJson = JsonSerializer.Serialize(
            proposals,
            new JsonSerializerOptions
            {
                WriteIndented = true
            }
        );

        await File.WriteAllTextAsync(filePath, updatedJson);

        return proposal;
    }
}