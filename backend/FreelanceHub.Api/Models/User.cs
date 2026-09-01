using System.Text.Json.Serialization;
public class User
{ 
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("firstName")]
    public string FirstName { get; set; } = string.Empty;

    [JsonPropertyName("lastName")]
    public string LastName { get; set; } = string.Empty;
    
    [JsonPropertyName("photoURL")]
    public string PhotoURL { get; set; } = string.Empty;
    
    [JsonPropertyName("email")]
    public string Email { get; set; } = string.Empty;
    
    [JsonPropertyName("password")]
    public string Password { get; set; } = string.Empty;
    
    [JsonPropertyName("role")]
    public string Role { get; set; } = string.Empty;
    
    [JsonPropertyName("location")]
    public string Location { get; set; } = string.Empty;
    
    [JsonPropertyName("bio")]
    public string Bio { get; set; } = string.Empty;
    
    [JsonPropertyName("skills")]
    public List<string> Skills { get; set; } = new();
    
    [JsonPropertyName("hourlyRate")]
    public string HourlyRate { get; set; } = string.Empty;
    
    [JsonPropertyName("jobsCompleted")]
    public int JobsCompleted { get; set; }
    
    [JsonPropertyName("rating")]
    public double Rating { get; set; }
    
    [JsonPropertyName("savedJobIds")]
    public List<int> SavedJobIds { get; set; } = new();
    
    [JsonPropertyName("memberSince")]
    public string MemberSince { get; set; } = string.Empty;
}