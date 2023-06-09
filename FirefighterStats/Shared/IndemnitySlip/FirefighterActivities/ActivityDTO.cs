// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Shared" file="ActivityDTO.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Shared.IndemnitySlip.FirefighterActivities;

using FirefighterStats.Shared.Utils;

public class ActivityDTO
{
    public double Amount { get; set; }

    public double DurationInHours { get; set; }

    public required DateTime EndDateTime { get; set; }

    public required string Id { get; set; }

    public required Percentage Rate { get; set; }

    public required DateTime StartDateTime { get; set; }

    public required string Title { get; set; }

    public required double UnitAmount { get; set; }
}
