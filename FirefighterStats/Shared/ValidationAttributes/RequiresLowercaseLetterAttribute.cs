// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Shared" file="RequiresLowercaseLetterAttribute.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Shared.ValidationAttributes;

using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

[AttributeUsage(AttributeTargets.Property)]
public partial class RequiresLowercaseLetterAttribute : ValidationAttribute
{
    /// <inheritdoc />
    public override bool IsValid(object? value)
    {
        if (value is not string str)
        {
            return true;
        }

        if (RegexPattern().IsMatch(str))
        {
            return true;
        }

        ErrorMessage = "Password must be contains a lowercase letter.";
        return false;
    }

    [GeneratedRegex("[a-z]")]
    private static partial Regex RegexPattern();
}