// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Server" file="ApplicationDbContext.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

#pragma warning disable CS8618
namespace FirefighterStats.Server.Data;

using Duende.IdentityServer.EntityFramework.Options;
using FirefighterStats.Server.Entities;
using JetBrains.Annotations;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

public class ApplicationDbContext : ApiAuthorizationDbContext<Firefighter>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IOptions<OperationalStoreOptions> operationalStoreOptions)
        : base(options, operationalStoreOptions)
    {
    }

    [UsedImplicitly]
    public DbSet<Firefighter> Firefighters { get; set; }
}