// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Shared" file="Percentage.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Shared.Utils;

using System.Globalization;
using System.Text.RegularExpressions;

public readonly partial struct Percentage
{
    private readonly double _value;

    private Percentage(double value)
    {
        _value = value;
    }

    public static bool operator ==(Percentage? left, Percentage? right)
    {
        return left?.Equals(right) ?? right is null;
    }

    public static implicit operator double(Percentage percentage)
    {
        return percentage._value;
    }

    public static implicit operator Percentage(double value)
    {
        return new Percentage(value);
    }

    public static implicit operator Percentage(string? str)
    {
        ArgumentNullException.ThrowIfNull(str);

        if (!RegexFormat().IsMatch(str))
        {
            throw new FormatException($"Unable to parse {str} to Percentage");
        }

        string strValue = str.EndsWith("%", StringComparison.Ordinal)
                              ? str[..^1]
                              : str;

        double value = double.Parse(strValue, CultureInfo.InvariantCulture);

        return new Percentage(value);
    }

    public static bool operator !=(Percentage? left, Percentage? right)
    {
        return !(left == right);
    }

    public static Percentage operator *(Percentage left, Percentage right)
    {
        return left._value * right._value / 100;
    }

    public static double operator *(Percentage left, double right)
    {
        return left / 100 * right;
    }

    public static double operator *(double left, Percentage right)
    {
        return left * (right / 100);
    }

    /// <inheritdoc />
    public override bool Equals(object? obj)
    {
        return obj is Percentage other && Equals(other);
    }

    /// <inheritdoc />
    public override int GetHashCode()
    {
        return _value.GetHashCode();
    }

    /// <inheritdoc />
    public override string ToString()
    {
        return $"{_value}%";
    }

    [GeneratedRegex("^[0-9]+(.[0-9]+){0,1}%{0,1}$")]
    private static partial Regex RegexFormat();

    private bool Equals(Percentage other)
    {
        return _value.Equals(other._value);
    }
}