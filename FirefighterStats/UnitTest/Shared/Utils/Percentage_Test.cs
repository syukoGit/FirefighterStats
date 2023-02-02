// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.UnitTest" file="Percentage_Test.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.UnitTest.Shared.Utils;

using FirefighterStats.Shared.Utils;

public class Percentage_Test
{
    [Fact]
    public void EqualityOperator_PercentageAndNull_False()
    {
        Percentage p1 = 25;
        Percentage? p2 = null;

        Assert.False(p1 == p2, $"{p1} == null are considered equal");
        Assert.False(p2 == p1, $"null == {p1} are considered equal");
    }

    [Fact]
    public void EqualityOperator_TwoNullPercentages_True()
    {
        Percentage? p1 = null;
        Percentage? p2 = null;

        Assert.True(p1 == p2, "null and null aren't considered equal");
    }

    [Fact]
    public void EqualityOperator_TwoPercentages_False()
    {
        Percentage p1 = 25;
        Percentage p2 = 25.5;

        Assert.False(p1 == p2, $"{p1} and {p2} are considered equal");
    }

    [Fact]
    public void EqualityOperator_TwoPercentages_True()
    {
        Percentage p1 = 25;
        Percentage p2 = 25;

        Assert.True(p1 == p2, $"{p1} and {p2} aren't considered equal");
    }

    [Fact]
    public void GetHashCode_SamePercentage_True()
    {
        Percentage p = 30;

        int firstHashCode = p.GetHashCode();
        int secondHashCode = p.GetHashCode();

        Assert.Equal(firstHashCode, secondHashCode);
    }

    [Theory]
    [InlineData("")]
    [InlineData("%")]
    [InlineData(".")]
    [InlineData("2.")]
    [InlineData("2.%")]
    [InlineData(".%")]
    public void ImplicitConversion_StringToPercentage_Failed(string value)
    {
        Assert.Throws<FormatException>(() => (Percentage) value);
    }

    [Theory]
    [InlineData("2%", 2)]
    [InlineData("0.5%", 0.5)]
    [InlineData("12.51%", 12.51)]
    [InlineData("0000.000001%", 0.000001)]
    [InlineData("1000%", 1000)]
    public void ImplicitConversion_StringToPercentage_Success(string value, double result)
    {
        Percentage percentage = value;

        Assert.Equal<double>(percentage, result);
    }

    [Fact]
    public void InequalityOperator_TwoPercentages_False()
    {
        Percentage p1 = 25;
        Percentage p2 = 25;

        Assert.False(p1 != p2, $"{p1} and {p2} aren't considered equal");
    }

    [Fact]
    public void InequalityOperator_TwoPercentages_True()
    {
        Percentage p1 = 25;
        Percentage p2 = 15;

        Assert.True(p1 != p2, $"{p1} and {p2} are considered equal");
    }

    [Fact]
    public void MultiplicationOperator_PercentageAndDouble_Result()
    {
        Percentage percentage = 25;
        const double value = 45;

        const double result = 11.25;

        Assert.Equal(result, percentage * value);
        Assert.Equal(result, value * percentage);
    }

    [Fact]
    public void MultiplicationOperator_TwoPercentages_IsPercentage()
    {
        Percentage p1 = 25;
        Percentage p2 = 25;

        Assert.IsType<Percentage>(p1 * p2);
    }

    [Fact]
    public void MultiplicationOperator_TwoPercentages_Result()
    {
        Percentage p1 = 25;
        Percentage p2 = 15;

        Assert.True(p1 * p2 == 3.75);
    }
}