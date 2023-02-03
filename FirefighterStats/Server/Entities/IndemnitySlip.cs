// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Server" file="IndemnitySlip.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Server.Entities;

using System.ComponentModel.DataAnnotations;
using FirefighterStats.Server.Entities.FirefighterActivities;
using FirefighterStats.Shared.Utils;
using JetBrains.Annotations;

[UsedImplicitly]
public class IndemnitySlip
{
    public IEnumerable<Activity>? Activities { get; set; }

    [Key]
    public required string Id { get; set; }

    public IEnumerable<Intervention>? Interventions { get; set; }

    public required EMonth Month { get; set; }

    public required int Year { get; set; }
}