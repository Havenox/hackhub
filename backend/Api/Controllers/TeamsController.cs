using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Api.Infrastructure;
using Api.DTOs;
using Api.Domain;

namespace Api.Controllers;

[ApiController]
[Route("api/hackathons/{hackathonId:guid}/[controller]")]
public class TeamsController : ControllerBase
{
    private readonly AppDbContext _db;
    public TeamsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<object>> List(Guid hackathonId)
    {
        var list = await _db.Teams
            .Where(t => t.HackathonId == hackathonId)
            .Select(t => new {
                t.Id, t.Name, t.ImageUrl, t.Description,
                Slots = t.Slots.Select(s => new { s.Id, s.RoleName, s.Requirements, s.IsFilled })
            }).ToListAsync();
        return Ok(list);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<object>> Create(Guid hackathonId, [FromBody] TeamCreateRequest request)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirst("sub")?.Value;
        if (userIdClaim == null) return Forbid();
        var userId = Guid.Parse(userIdClaim);

        var enrolled = await _db.HackathonEnrollments.AnyAsync(e => e.HackathonId == hackathonId && e.UserId == userId);
        if (!enrolled) return Forbid("User is not enrolled in this hackathon");

        // Validation: user cannot be in more than one team in same hackathon
        var alreadyMember = await _db.Teams.AnyAsync(t => t.HackathonId == hackathonId && t.OwnerId == userId);
        if (alreadyMember) return Conflict("User already has a team in this hackathon");

        var team = new Team
        {
            HackathonId = hackathonId,
            OwnerId = userId,
            Name = request.Name,
            ImageUrl = request.ImageUrl,
            Description = request.Description,
        };

        _db.Teams.Add(team);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { hackathonId, teamId = team.Id }, new { team.Id, team.Name, team.ImageUrl, team.Description });
    }

    [HttpGet("{teamId:guid}")]
    [AllowAnonymous]
    public async Task<ActionResult<object>> Get(Guid hackathonId, Guid teamId)
    {
        var t = await _db.Teams.Include(t => t.Slots).FirstOrDefaultAsync(t => t.Id == teamId && t.HackathonId == hackathonId);
        if (t == null) return NotFound();
        return Ok(new
        {
            t.Id,
            t.Name,
            t.ImageUrl,
            t.Description,
            Slots = t.Slots.Select(s => new { s.Id, s.RoleName, s.Requirements, s.IsFilled })
        });
    }

    [HttpPost("{teamId:guid}/slots")]
    [Authorize]
    public async Task<ActionResult> AddSlot(Guid hackathonId, Guid teamId, [FromBody] TeamSlotRequest request)
    {
        var t = await _db.Teams.FirstOrDefaultAsync(t => t.Id == teamId && t.HackathonId == hackathonId);
        if (t == null) return NotFound();
        var userId = Guid.Parse(User.FindFirstValue("sub")!);
        if (t.OwnerId != userId) return Forbid();

        _db.TeamSlots.Add(new TeamSlot
        {
            TeamId = teamId,
            RoleName = request.RoleName,
            Requirements = request.Requirements
        });
        await _db.SaveChangesAsync();
        return NoContent();
    }
}

