// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Shared" file="FirefighterDTO.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Shared.Firefighter;

public class FirefighterDTO
{
    public DateTime CareerStartDate { get; set; }

    public string? FireStation { get; set; }

    public string? FirstName { get; set; }

    public required string Id { get; set; }

    public string? LastName { get; set; }

    public EFirefighterRank Rank { get; set; }

    public string? RegistrationNumber { get; set; }
}