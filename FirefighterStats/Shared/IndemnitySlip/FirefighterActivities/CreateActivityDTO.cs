// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Shared" file="CreateActivityDTO.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Shared.IndemnitySlip.FirefighterActivities;

using FirefighterStats.Shared.Utils;

public class CreateActivityDTO
{
    public required DateTime EndDateTime { get; set; }

    public required Percentage Rate { get; set; }

    public required DateTime StartDateTime { get; set; }

    public required string Title { get; set; }

    public required double UnitAmount { get; set; }
}