// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Client" file="EnumExtension.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Client.Extensions;

using System.ComponentModel.DataAnnotations;
using System.Reflection;

public static class EnumExtension
{
    public static string GetDisplayName(this Enum value)
    {
        FieldInfo? field = value.GetType().GetField(value.ToString());

        var displayAttribute = field?.GetCustomAttribute<DisplayAttribute>();

        if (displayAttribute == null)
        {
            return value.ToString();
        }

        return displayAttribute.Name ?? value.ToString();
    }
}