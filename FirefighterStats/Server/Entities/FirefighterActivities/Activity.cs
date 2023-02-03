// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Server" file="Activity.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Server.Entities.FirefighterActivities;

using FirefighterStats.Shared.Utils;
using JetBrains.Annotations;

[UsedImplicitly]
public class Activity : FirefighterActivity
{
    /// <inheritdoc />
    public override double Amount => Math.Round(DurationInHours * Rate * UnitAmount, 2);

    public double DurationInHours => (EndDateTime - StartDateTime).TotalHours;

    public required Percentage Rate { get; set; }
}