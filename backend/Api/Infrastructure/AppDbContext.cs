using Microsoft.EntityFrameworkCore;
using Api.Domain;

namespace Api.Infrastructure;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Hackathon> Hackathons => Set<Hackathon>();
    public DbSet<HackathonEnrollment> HackathonEnrollments => Set<HackathonEnrollment>();
    public DbSet<Team> Teams => Set<Team>();
    public DbSet<TeamSlot> TeamSlots => Set<TeamSlot>();
    public DbSet<TeamApplication> TeamApplications => Set<TeamApplication>();
    public DbSet<Announcement> Announcements => Set<Announcement>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<HackathonEnrollment>()
            .HasIndex(e => new { e.HackathonId, e.UserId })
            .IsUnique();

        modelBuilder.Entity<Team>()
            .HasIndex(t => new { t.HackathonId, t.OwnerId });

        modelBuilder.Entity<TeamApplication>()
            .HasIndex(a => new { a.TeamId, a.ApplicantId })
            .IsUnique();

        modelBuilder.Entity<Team>()
            .HasOne(t => t.Owner)
            .WithMany()
            .HasForeignKey(t => t.OwnerId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<TeamSlot>()
            .HasOne(s => s.Team)
            .WithMany(t => t.Slots)
            .HasForeignKey(s => s.TeamId);

        modelBuilder.Entity<TeamApplication>()
            .HasOne(a => a.Team)
            .WithMany(t => t.Applications)
            .HasForeignKey(a => a.TeamId);
    }
}

