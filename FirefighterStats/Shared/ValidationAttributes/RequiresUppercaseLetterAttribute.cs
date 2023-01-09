// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Shared" file="RequiresUppercaseLetterAttribute.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Shared.ValidationAttributes;

using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

[AttributeUsage(AttributeTargets.Property)]
public partial class RequiresUppercaseLetterAttribute : ValidationAttribute
{
    /// <inheritdoc />
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        return value is not string str || RegexPattern().IsMatch(str)
                   ? ValidationResult.Success
                   : new ValidationResult("Password must be contains a uppercase letter.");
    }

    [GeneratedRegex(@"[A-Z]")]
    private static partial Regex RegexPattern();
}