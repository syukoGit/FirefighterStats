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
    public DateTime CareerStartDate { get; set; }

    public string FireStation { get; set; } = string.Empty;

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public EFirefighterRank Rank { get; set; }

    public string? RegistrationNumber { get; set; }
}