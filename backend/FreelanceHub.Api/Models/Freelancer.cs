using System.Text.Json.Serialization;

namespace FreelanceHub.Api.Models;

public class Freelancer
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("title")]
    public string Title { get; set; } = string.Empty;

    [JsonPropertyName("location")]
    public string Location { get; set; } = string.Empty;

    [JsonPropertyName("rating")]
    public double Rating { get; set; }

    [JsonPropertyName("reviews")]
    public int Reviews { get; set; }

    [JsonPropertyName("hourlyRate")]
    public string HourlyRate { get; set; } = string.Empty;

    [JsonPropertyName("skills")]
    public List<string> Skills { get; set; } = [];

    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;

    [JsonPropertyName("jobsCompleted")]
    public int JobsCompleted { get; set; }

    [JsonPropertyName("availability")]
    public string Availability { get; set; } = string.Empty;
}