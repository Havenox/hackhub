using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Infrastructure;
using System.Security.Claims;

namespace Api.Controllers;

[ApiController]
[Route("api/hackathons/{hackathonId:guid}/[controller]")]
public class AnnouncementsController : ControllerBase
{
    private readonly AppDbContext _db;
    public AnnouncementsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<object>> List(Guid hackathonId)
    {
        var list = await _db.Announcements
            .Where(a => a.HackathonId == hackathonId)
            .OrderByDescending(a => a.PublishedAt)
            .Select(a => new { a.Id, a.Title, a.Content, a.PublishedAt })
            .ToListAsync();
        return Ok(list);
    }

    [HttpPost]
    [Authorize(Policy = "OrganizerOnly")]
    public async Task<ActionResult> Create(Guid hackathonId, [FromBody] AnnouncementCreateRequest request)
    {
        var organizerId = Guid.Parse(User.FindFirstValue("sub")!);
        var h = await _db.Hackathons.FirstOrDefaultAsync(h => h.Id == hackathonId && h.OrganizerId == organizerId);
        if (h == null) return Forbid();

        _db.Announcements.Add(new Domain.Announcement
        {
            HackathonId = hackathonId,
            Title = request.Title,
            Content = request.Content
        });
        await _db.SaveChangesAsync();
        return NoContent();
    }
}

public class AnnouncementCreateRequest
{
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
}

