using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Infrastructure;
using Api.DTOs;
using Api.Domain;
using System.Security.Claims;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HackathonsController : ControllerBase
{
    private readonly AppDbContext _db;
    public HackathonsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<HackathonResponse>>> GetAll()
    {
        var items = await _db.Hackathons
            .OrderByDescending(h => h.CreatedAt)
            .Select(h => new HackathonResponse
            {
                Id = h.Id,
                Name = h.Name,
                Description = h.Description,
                IsPublic = h.IsPublic,
                StartDate = h.StartDate,
                EndDate = h.EndDate
            }).ToListAsync();
        return Ok(items);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<HackathonResponse>> Create([FromBody] HackathonCreateRequest request)
    {
        var organizerIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirst("sub")?.Value;
        if (organizerIdClaim == null) return Forbid();
        var organizerId = Guid.Parse(organizerIdClaim);

        var hack = new Hackathon
        {
            Name = request.Name,
            Description = request.Description,
            IsPublic = request.IsPublic,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            OrganizerId = organizerId
        };

        _db.Hackathons.Add(hack);
        await _db.SaveChangesAsync();

        var dto = new HackathonResponse
        {
            Id = hack.Id,
            Name = hack.Name,
            Description = hack.Description,
            IsPublic = hack.IsPublic,
            StartDate = hack.StartDate,
            EndDate = hack.EndDate
        };
        return CreatedAtAction(nameof(GetById), new { id = hack.Id }, dto);
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<ActionResult<HackathonResponse>> GetById(Guid id)
    {
        var h = await _db.Hackathons.FindAsync(id);
        if (h == null) return NotFound();
        return new HackathonResponse
        {
            Id = h.Id,
            Name = h.Name,
            Description = h.Description,
            IsPublic = h.IsPublic,
            StartDate = h.StartDate,
            EndDate = h.EndDate
        };
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult> Update(Guid id, [FromBody] HackathonCreateRequest request)
    {
        var h = await _db.Hackathons.FindAsync(id);
        if (h == null) return NotFound();
        
        //politica de apenas o "dono" do grupo poder editar
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return Forbid();
        // só o criador do grupo ou Admin do site pode editar
        if (h.OrganizerId.ToString() != userId && !User.IsInRole("Admin"))
            return Forbid();

        h.Name = request.Name;
        h.Description = request.Description;
        h.IsPublic = request.IsPublic;
        h.StartDate = request.StartDate;
        h.EndDate = request.EndDate;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ActionResult> Delete(Guid id)
    {
        var h = await _db.Hackathons.FindAsync(id);
        if (h == null) return NotFound();

        //politica de permissao, apenas dono do grupo, ou admin do site, pode deletar o hackathon
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return Forbid();
        if (h.OrganizerId.ToString() != userId && !User.IsInRole("Admin"))
            return Forbid();

        _db.Hackathons.Remove(h);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}

