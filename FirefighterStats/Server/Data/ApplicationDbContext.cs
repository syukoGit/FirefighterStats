// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Server" file="ApplicationDbContext.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Server.Data;

using FirefighterStats.Server.Entities;
using FirefighterStats.Server.Entities.FirefighterActivities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : IdentityDbContext<Firefighter>(options)
{
    /// <inheritdoc />
    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<IndemnitySlip>().Navigation(static c => c.Activities).AutoInclude();
        builder.Entity<IndemnitySlip>().Navigation(static c => c.Interventions).AutoInclude();
        builder.Entity<IndemnitySlip>().Property(static c => c.Id).ValueGeneratedOnAdd();

        builder.Entity<Activity>().Property(static c => c.Rate).HasConversion<double>(static p => p, static d => d);
        builder.Entity<Activity>().Property(static c => c.Id).ValueGeneratedOnAdd();

        builder.Entity<Intervention>().Property(static c => c.Id).ValueGeneratedOnAdd();

        base.OnModelCreating(builder);
    }
}
