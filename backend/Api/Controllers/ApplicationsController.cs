using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Api.Infrastructure;
using Api.DTOs;
using Api.Domain;

namespace Api.Controllers;

[ApiController]
[Route("api/hackathons/{hackathonId:guid}/teams/{teamId:guid}/[controller]")]
public class ApplicationsController : ControllerBase
{
    private readonly AppDbContext _db;
    public ApplicationsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult> Apply(Guid hackathonId, Guid teamId, [FromBody] TeamApplicationRequest request)
    {
        var team = await _db.Teams.FirstOrDefaultAsync(t => t.Id == teamId && t.HackathonId == hackathonId);
        if (team == null) return NotFound();
        var userId = Guid.Parse(User.FindFirstValue("sub")!);

        var enrolled = await _db.HackathonEnrollments.AnyAsync(e => e.HackathonId == hackathonId && e.UserId == userId);
        if (!enrolled) return Forbid("User is not enrolled in this hackathon");

        // Validation: user cannot already be in a team for this hackathon (owner equivalence for MVP)
        var alreadyOwner = await _db.Teams.AnyAsync(t => t.HackathonId == hackathonId && t.OwnerId == userId);
        if (alreadyOwner) return Conflict("User already participates in a team for this hackathon");

        var exists = await _db.TeamApplications.AnyAsync(a => a.TeamId == teamId && a.ApplicantId == userId);
        if (exists) return Conflict("Already applied");

        _db.TeamApplications.Add(new TeamApplication
        {
            TeamId = teamId,
            ApplicantId = userId,
            Message = request.Message
        });
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost("{applicationId:guid}/accept")]
    [Authorize]
    public async Task<ActionResult> Accept(Guid hackathonId, Guid teamId, Guid applicationId)
    {
        var team = await _db.Teams.FirstOrDefaultAsync(t => t.Id == teamId && t.HackathonId == hackathonId);
        if (team == null) return NotFound();
        var userId = Guid.Parse(User.FindFirstValue("sub")!);
        if (team.OwnerId != userId) return Forbid();

        var app = await _db.TeamApplications.FirstOrDefaultAsync(a => a.Id == applicationId && a.TeamId == teamId);
        if (app == null) return NotFound();
        if (app.Status != ApplicationStatus.Pending) return Conflict("Already decided");

        app.Status = ApplicationStatus.Accepted;
        app.DecisionAt = DateTime.UtcNow;

        // Mark slot filled in a basic way (first available)
        var slot = await _db.TeamSlots.FirstOrDefaultAsync(s => s.TeamId == teamId && !s.IsFilled);
        if (slot != null)
        {
            slot.IsFilled = true;
        }

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost("{applicationId:guid}/reject")]
    [Authorize]
    public async Task<ActionResult> Reject(Guid hackathonId, Guid teamId, Guid applicationId)
    {
        var team = await _db.Teams.FirstOrDefaultAsync(t => t.Id == teamId && t.HackathonId == hackathonId);
        if (team == null) return NotFound();
        var userId = Guid.Parse(User.FindFirstValue("sub")!);
        if (team.OwnerId != userId) return Forbid();

        var app = await _db.TeamApplications.FirstOrDefaultAsync(a => a.Id == applicationId && a.TeamId == teamId);
        if (app == null) return NotFound();
        if (app.Status != ApplicationStatus.Pending) return Conflict("Already decided");

        app.Status = ApplicationStatus.Rejected;
        app.DecisionAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return NoContent();
    }
}

