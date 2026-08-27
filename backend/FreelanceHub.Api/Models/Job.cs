using System.Text.Json.Serialization;

namespace FreelanceHub.Api.Models;

public class Job
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("title")]
    public string Title { get; set; } = string.Empty;

    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;

    [JsonPropertyName("budget")]
    public string Budget { get; set; } = string.Empty;

    [JsonPropertyName("type")]
    public string Type { get; set; } = string.Empty;

    [JsonPropertyName("category")]
    public string Category { get; set; } = string.Empty;

    [JsonPropertyName("skills")]
    public List<string> Skills { get; set; } = [];

    [JsonPropertyName("posted")]
    public string Posted { get; set; } = string.Empty;

    [JsonPropertyName("proposals")]
    public int Proposals { get; set; }
}