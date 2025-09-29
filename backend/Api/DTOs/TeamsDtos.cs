namespace Api.DTOs;

public class TeamCreateRequest
{
    public string Name { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public string? Description { get; set; }
}

public class TeamSlotRequest
{
    public string RoleName { get; set; } = string.Empty;
    public string? Requirements { get; set; }
}

public class TeamApplicationRequest
{
    public string? Message { get; set; }
}

