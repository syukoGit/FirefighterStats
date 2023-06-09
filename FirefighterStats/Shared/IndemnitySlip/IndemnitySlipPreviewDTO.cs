// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Shared" file="IndemnitySlipPreviewDTO.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Shared.IndemnitySlip;

using FirefighterStats.Shared.Utils;

public class IndemnitySlipPreviewDTO
{
    public required string Id { get; set; }

    public required EMonth Month { get; set; }

    public required int NumberActivities { get; set; }

    public required int NumberInterventions { get; set; }

    public required double TotalAmount { get; set; }

    public required int Year { get; set; }
}
