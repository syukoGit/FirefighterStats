// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Server" file="ApplicationDbContext.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

#pragma warning disable CS8618
namespace FirefighterStats.Server.Data;

using FirefighterStats.Server.Entities;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : IdentityDbContext<Firefighter>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    [UsedImplicitly]
    public DbSet<Firefighter> Firefighters { get; set; }
}