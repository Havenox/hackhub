using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Api.Infrastructure;
using Api.Services;
using DotNetEnv;



var builder = WebApplication.CreateBuilder(args);

// Carrega o .env
Env.Load();

// Load configuration
var configuration = builder.Configuration;

// Add services to the container
builder.Services.AddControllers();

// Database: MariaDB via Pomelo
var connectionString = Environment.GetEnvironmentVariable("MARIADB_CONNECTION_STRING")
    ?? configuration.GetConnectionString("MariaDb")
    ?? "server=localhost;port=3306;database=granhackathon;user=root;password=changeme;";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
           .EnableDetailedErrors()
           .EnableSensitiveDataLogging());

// JWT Authentication
var jwtIssuer = Environment.GetEnvironmentVariable("JWT__ISSUER") ?? configuration["Jwt:Issuer"] ?? "GranHackathon";
var jwtAudience = Environment.GetEnvironmentVariable("JWT__AUDIENCE") ?? configuration["Jwt:Audience"] ?? "GranHackathonAudience";
var jwtKey = Environment.GetEnvironmentVariable("JWT__KEY") ?? configuration["Jwt:Key"] ?? "super_secret_dev_key_change_me_please";

var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));


//CARREGA A URL DO FRONT
var frontBaseUrl = Environment.GetEnvironmentVariable("FRONT_BASE_URL");
Console.WriteLine($"👉 Recebendo Front em: {frontBaseUrl}");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidateLifetime = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = signingKey,
        ClockSkew = TimeSpan.FromMinutes(2)
    };
});
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("OrganizerOnly", policy => policy.RequireRole("Organizer", "Admin"));
});
// =====================
// 🚀 configuraçãoo do cors
// =====================
var corsPolicyName = "_hackhubCors";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicyName,
        policy =>
        {
            //ENDEREÇO DO FRONT IMPORTADO DO .ENV
            policy.WithOrigins(frontBaseUrl) // domínio do front
                  .AllowAnyHeader()
                  .AllowAnyMethod(); // permite GET, POST, OPTIONS, etc.
        });
});
// App Services
builder.Services.AddSingleton<ITokenService>(new TokenService(jwtIssuer, jwtAudience, signingKey));
builder.Services.AddSingleton<IHashingService, BcryptHashingService>();

// Swagger with JWT support
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "GranHackathon API", Version = "v1" });
    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter JWT Bearer token"
    };
    c.AddSecurityDefinition("Bearer", securityScheme);
    var securityRequirement = new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme { Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" } },
            Array.Empty<string>()
        }
    };
    c.AddSecurityRequirement(securityRequirement);
});

builder.WebHost.UseUrls(Environment.GetEnvironmentVariable("ASPNETCORE_URLS") ?? "http://localhost:5000");

var app = builder.Build();

// Configure the HTTP request pipeline
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors(corsPolicyName);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

