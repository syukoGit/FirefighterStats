// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Server" file="Activity.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Server.Entities.FirefighterActivities;

using System.ComponentModel.DataAnnotations;
using FirefighterStats.Shared.Utils;
using JetBrains.Annotations;

[UsedImplicitly]
public class Activity
{
    public double Amount => Math.Round(DurationInHours * Rate * UnitAmount, 2);

    public double DurationInHours => (EndDateTime - StartDateTime).TotalHours;

    public required DateTime EndDateTime { get; set; }

    [Key]
    public required string Id { get; set; }

    public required IndemnitySlip IndemnitySlip { get; set; }

    public required Percentage Rate { get; set; }

    public required DateTime StartDateTime { get; set; }

    public required string Title { get; set; }

    public required double UnitAmount { get; set; }
}