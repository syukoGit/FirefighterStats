// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.UnitTest" file="Percentage_Test.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.UnitTest.Shared.Utils;

using FirefighterStats.Shared.Utils;

[TestClass]
public class Percentage_Test
{
    [TestMethod]
    public void EqualityOperator_PercentageAndNull_False()
    {
        Percentage p1 = 25;
        Percentage? p2 = null;

        Assert.IsFalse(p1 == p2, $"{p1} == null are considered equal");
        Assert.IsFalse(p2 == p1, $"null == {p1} are considered equal");
    }

    [TestMethod]
    public void EqualityOperator_TwoNullPercentages_True()
    {
        Percentage? p1 = null;
        Percentage? p2 = null;

        Assert.IsTrue(p1 == p2, "null and null aren't considered equal");
    }

    [TestMethod]
    public void EqualityOperator_TwoPercentages_False()
    {
        Percentage p1 = 25;
        Percentage p2 = 25.5;

        Assert.IsFalse(p1 == p2, $"{p1} and {p2} are considered equal");
    }

    [TestMethod]
    public void EqualityOperator_TwoPercentages_True()
    {
        Percentage p1 = 25;
        Percentage p2 = 25;

        Assert.IsTrue(p1 == p2, $"{p1} and {p2} aren't considered equal");
    }

    [TestMethod]
    public void GetHashCode_SamePercentage_True()
    {
        Percentage p = 30;

        int firstHashCode = p.GetHashCode();
        int secondHashCode = p.GetHashCode();

        Assert.AreEqual(firstHashCode, secondHashCode);
    }

    [TestMethod]
    public void InequalityOperator_TwoPercentages_False()
    {
        Percentage p1 = 25;
        Percentage p2 = 25;

        Assert.IsFalse(p1 != p2, $"{p1} and {p2} aren't considered equal");
    }

    [TestMethod]
    public void InequalityOperator_TwoPercentages_True()
    {
        Percentage p1 = 25;
        Percentage p2 = 15;

        Assert.IsTrue(p1 != p2, $"{p1} and {p2} are considered equal");
    }

    [TestMethod]
    public void MultiplicationOperator_PercentageAndDouble_Result()
    {
        Percentage percentage = 25;
        const double value = 45;

        const double result = 11.25;

        Assert.AreEqual(result, percentage * value);
        Assert.AreEqual(result, value * percentage);
    }

    [TestMethod]
    public void MultiplicationOperator_TwoPercentages_IsPercentage()
    {
        Percentage p1 = 25;
        Percentage p2 = 25;

        Assert.IsInstanceOfType(p1 * p2, typeof(Percentage));
    }

    [TestMethod]
    public void MultiplicationOperator_TwoPercentages_Result()
    {
        Percentage p1 = 25;
        Percentage p2 = 15;

        Assert.IsTrue(p1 * p2 == 3.75);
    }
}