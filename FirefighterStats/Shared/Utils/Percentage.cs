// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Shared" file="Percentage.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Shared.Utils;

public readonly struct Percentage
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
        return percentage._value / 100;
    }

    public static implicit operator Percentage(double value)
    {
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
        return (double) left * right;
    }

    public static double operator *(double left, Percentage right)
    {
        return left * (double) right;
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

    private bool Equals(Percentage other)
    {
        return _value.Equals(other._value);
    }
}