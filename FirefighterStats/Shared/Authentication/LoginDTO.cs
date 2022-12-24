// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Shared" file="LoginDTO.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Shared.Authentication;

using System.ComponentModel.DataAnnotations;

public class LoginDTO
{
    [Required]
    [Compare(nameof(Password))]
    [DataType(DataType.Password)]
    public string ConfirmPassword { get; set; } = string.Empty;

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; } = string.Empty;

    public bool RememberMe { get; set; } = false;

    [Required]
    public string UserName { get; set; } = string.Empty;
}