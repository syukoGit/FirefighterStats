// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Shared" file="RequiresNonAlphanumericAttribute.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Shared.ValidationAttributes;

using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

[AttributeUsage(AttributeTargets.Property)]
public partial class RequiresNonAlphanumericAttribute : ValidationAttribute
{
    /// <inheritdoc />
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        return value is not string str || RegexPattern().IsMatch(str)
                   ? ValidationResult.Success
                   : new ValidationResult("Password must be contains a non-alphanumeric character.");
    }

    [GeneratedRegex("[!@#$%^&*()_+-=\\[\\]{}|;':\\\",.<>/?]")]
    private static partial Regex RegexPattern();
}