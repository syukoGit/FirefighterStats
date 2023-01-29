// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Shared" file="UpdateFirefighterPropsDTO.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Shared.Firefighter;

using FirefighterStats.Shared.ValidationAttributes;

public class UpdateFirefighterPropsDTO
{
    [BeforeNow]
    public DateTime? CareerStartDate { get; set; }

    public string? FireStation { get; set; }

    public EFirefighterRank? Rank { get; set; }

    public string? RegistrationNumber { get; set; }
}