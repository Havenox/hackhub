namespace Api.Domain;

public enum UserRole
{
    User = 0,
    Organizer = 1,
    Admin = 2
}

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Email { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public UserRole Role { get; set; } = UserRole.User;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Hackathon
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsPublic { get; set; } = true;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public Guid OrganizerId { get; set; }
    public User? Organizer { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class HackathonEnrollment
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid HackathonId { get; set; }
    public Hackathon? Hackathon { get; set; }
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;
}

public class Team
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid HackathonId { get; set; }
    public Hackathon? Hackathon { get; set; }
    public Guid OwnerId { get; set; }
    public User? Owner { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public string? Description { get; set; }
    public List<TeamSlot> Slots { get; set; } = new();
    public List<TeamApplication> Applications { get; set; } = new();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class TeamSlot
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid TeamId { get; set; }
    public Team? Team { get; set; }
    public string RoleName { get; set; } = string.Empty; // e.g., Frontend, Backend, Data, etc.
    public string? Requirements { get; set; }
    public bool IsFilled { get; set; } = false;
}

public enum ApplicationStatus
{
    Pending = 0,
    Accepted = 1,
    Rejected = 2
}

public class TeamApplication
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid TeamId { get; set; }
    public Team? Team { get; set; }
    public Guid ApplicantId { get; set; }
    public User? Applicant { get; set; }
    public string? Message { get; set; }
    public ApplicationStatus Status { get; set; } = ApplicationStatus.Pending;
    public DateTime AppliedAt { get; set; } = DateTime.UtcNow;
    public DateTime? DecisionAt { get; set; }
}

public class Announcement
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid HackathonId { get; set; }
    public Hackathon? Hackathon { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public DateTime PublishedAt { get; set; } = DateTime.UtcNow;
}

