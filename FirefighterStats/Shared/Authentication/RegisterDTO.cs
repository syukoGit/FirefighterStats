// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Shared" file="RegisterDTO.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Shared.Authentication;

using System.ComponentModel.DataAnnotations;
using FirefighterStats.Shared.Firefighter;
using FirefighterStats.Shared.ValidationAttributes;

public class RegisterDTO
{
    [BeforeNow]
    public DateTime? CareerStartDate { get; set; }

    [Required]
    [Compare(nameof(Password))]
    [DataType(DataType.Password)]
    public string ConfirmPassword { get; set; } = string.Empty;

    public string? FireStation { get; set; }

    [Required]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    public string LastName { get; set; } = string.Empty;

    [Required]
    [DataType(DataType.Password)]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters.")]
    [RequiresLowercaseLetter]
    [RequiresUppercaseLetter]
    [RequiresDigit]
    [RequiresNonAlphanumeric]
    public string Password { get; set; } = string.Empty;

    public EFirefighterRank? Rank { get; set; }

    public string? RegistrationNumber { get; set; }

    [Required]
    public string UserName { get; set; } = string.Empty;
}