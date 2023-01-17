// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Shared" file="LoginResultDTO.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Shared.Authentication;

public class LoginResultDTO
{
    public required DateTime Expiration { get; set; }

    public required string Token { get; set; }
}