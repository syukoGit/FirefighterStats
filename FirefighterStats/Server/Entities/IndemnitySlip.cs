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
    public List<Activity> Activities { get; set; } = new ();

    [Key]
    public required string Id { get; set; }

    public List<Intervention> Interventions { get; set; } = new ();

    public required EMonth Month { get; set; }

    public double TotalAmount => Math.Round(Activities.Sum(static c => c.Amount) + Interventions.Sum(static c => c.Amount), 2);

    public required int Year { get; set; }
}
