namespace Api.DTOs;

public class HackathonCreateRequest
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsPublic { get; set; } = true;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}

public class HackathonResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsPublic { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}

