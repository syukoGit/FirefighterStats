// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Shared" file="IndemnitySlipDTO.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Shared.IndemnitySlip;

using FirefighterStats.Shared.IndemnitySlip.FirefighterActivities;
using FirefighterStats.Shared.Utils;

public class IndemnitySlipDTO
{
    public IEnumerable<ActivityDTO>? Activities { get; set; }

    public required string Id { get; set; }

    public IEnumerable<InterventionDTO>? Interventions { get; set; }

    public required EMonth Month { get; set; }

    public required int Year { get; set; }
}