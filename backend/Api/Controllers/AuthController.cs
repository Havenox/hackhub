using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Api.DTOs;
using Api.Domain;
using Api.Infrastructure;
using Api.Services;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IHashingService _hashing;
    private readonly ITokenService _tokens;

    public AuthController(AppDbContext db, IHashingService hashing, ITokenService tokens)
    {
        _db = db;
        _hashing = hashing;
        _tokens = tokens;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest("Email and password are required");
        }

        var exists = await _db.Users.AnyAsync(u => u.Email == request.Email);
        if (exists)
        {
            return Conflict("Email already registered");
        }

        var user = new User
        {
            Email = request.Email,
            Name = request.Name,
            PasswordHash = _hashing.HashPassword(request.Password),
            Role = UserRole.User
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        var token = _tokens.GenerateToken(user.Id, user.Name, user.Email, user.Role.ToString());
        return Ok(new AuthResponse { UserId = user.Id, Name = user.Name, Email = user.Email, Role = user.Role.ToString(), Token = token });
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        if (user == null)
        {
            return Unauthorized("Invalid credentials");
        }

        if (!_hashing.VerifyPassword(request.Password, user.PasswordHash))
        {
            return Unauthorized("Invalid credentials");
        }

        var token = _tokens.GenerateToken(user.Id, user.Name, user.Email, user.Role.ToString());
        return Ok(new AuthResponse { UserId = user.Id, Name = user.Name, Email = user.Email, Role = user.Role.ToString(), Token = token });
    }
}

