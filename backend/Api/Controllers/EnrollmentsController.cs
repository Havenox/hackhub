using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Infrastructure;
using System.Security.Claims;

namespace Api.Controllers;

[ApiController]
[Route("api/hackathons/{hackathonId:guid}/[controller]")]
public class EnrollmentsController : ControllerBase
{
    private readonly AppDbContext _db;
    public EnrollmentsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult> Enroll(Guid hackathonId)
    {
        var h = await _db.Hackathons.FindAsync(hackathonId);
        if (h == null) return NotFound();

        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirst("sub")?.Value;
        if (userIdClaim == null) return Forbid();
        var userId = Guid.Parse(userIdClaim);

        var exists = await _db.HackathonEnrollments.AnyAsync(e => e.HackathonId == hackathonId && e.UserId == userId);
        if (exists) return Conflict("Already enrolled");

        _db.HackathonEnrollments.Add(new Domain.HackathonEnrollment
        {
            HackathonId = hackathonId,
            UserId = userId
        });
        await _db.SaveChangesAsync();
        return NoContent();
    }
}

