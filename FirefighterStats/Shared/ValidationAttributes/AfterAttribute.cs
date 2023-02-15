// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Shared" file="AfterAttribute.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Shared.ValidationAttributes;

using System.ComponentModel.DataAnnotations;
using System.Reflection;

[AttributeUsage(AttributeTargets.Property)]
public class AfterAttribute : ValidationAttribute
{
    private readonly string _propertyName;

    public AfterAttribute(string propertyName)
    {
        _propertyName = propertyName;
    }

    /// <inheritdoc />
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is not DateTime afterDateTime)
        {
            return ValidationResult.Success;
        }

        object instance = validationContext.ObjectInstance;
        Type instanceType = validationContext.ObjectType;

        PropertyInfo? property = instanceType.GetProperty(_propertyName);

        if (property == null)
        {
            return ValidationResult.Success;
        }

        object? propertyValue = property.GetValue(instance);

        return propertyValue is not DateTime beforeDateTime || beforeDateTime < afterDateTime
                   ? ValidationResult.Success
                   : new ValidationResult($"{validationContext.DisplayName} must be after {_propertyName}");
    }
}