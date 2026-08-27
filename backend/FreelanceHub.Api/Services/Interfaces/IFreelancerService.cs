using FreelanceHub.Api.Models;
public interface IFreelancerService
{
    Task<List<Freelancer>> GetFreelancersAsync();
}