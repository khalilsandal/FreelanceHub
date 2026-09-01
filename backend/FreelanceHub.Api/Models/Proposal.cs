using System.Text.Json.Serialization;

public class Proposal
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("jobId")]
    public int JobId { get; set; }

    [JsonPropertyName("freelancerId")]
    public int FreelancerId { get; set; }

    [JsonPropertyName("jobTitle")]
    public string JobTitle { get; set; } = string.Empty;

    [JsonPropertyName("coverLetter")]
    public string CoverLetter { get; set; } = string.Empty;

    [JsonPropertyName("bidAmount")]
    public decimal BidAmount { get; set; }

    [JsonPropertyName("estimatedDuration")]
    public string EstimatedDuration { get; set; } = string.Empty;

    [JsonPropertyName("status")]
    public string Status { get; set; } = "pending";

    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; set; }
}
