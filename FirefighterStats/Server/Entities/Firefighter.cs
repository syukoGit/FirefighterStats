// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Server" file="Firefighter.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Server.Entities;

using FirefighterStats.Shared.Firefighter;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Identity;

[UsedImplicitly]
public class Firefighter : IdentityUser
{
    public DateTime? CareerStartDate { get; set; }

    public string? FireStation { get; set; }

    public required string FirstName { get; set; }

    public IEnumerable<IndemnitySlip>? IndemnitySlips { get; set; }

    public required string LastName { get; set; }

    public EFirefighterRank? Rank { get; set; }

    public string? RegistrationNumber { get; set; }
}