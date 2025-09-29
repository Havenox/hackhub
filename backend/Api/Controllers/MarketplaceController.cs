using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Infrastructure;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MarketplaceController : ControllerBase
{
    private readonly AppDbContext _db;
    public MarketplaceController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet("hackathons")] // public marketplace
    public async Task<ActionResult<object>> PublicHackathons()
    {
        var list = await _db.Hackathons
            .Where(h => h.IsPublic)
            .OrderBy(h => h.StartDate)
            .Select(h => new {
                h.Id, h.Name, h.Description, h.StartDate, h.EndDate
            }).ToListAsync();
        return Ok(list);
    }
}

