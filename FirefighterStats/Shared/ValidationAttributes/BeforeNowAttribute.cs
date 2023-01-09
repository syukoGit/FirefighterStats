// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Shared" file="BeforeNowAttribute.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Shared.ValidationAttributes;

using System.ComponentModel.DataAnnotations;

[AttributeUsage(AttributeTargets.Property)]
public class BeforeNowAttribute : ValidationAttribute
{
    /// <inheritdoc />
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        return value is not DateTime date || date.Date <= DateTime.Now.Date
                   ? ValidationResult.Success
                   : new ValidationResult("The date must be before now");
    }
}