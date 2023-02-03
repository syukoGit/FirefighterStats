// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.UnitTest" file="Intervention_Test.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.UnitTest.Server.Entities;

using FirefighterStats.Server.Entities.FirefighterActivities;
using FirefighterStats.UnitTest.Server.Entities.TestData;

public class Intervention_Test
{
    [Theory]
    [MemberData(nameof(InterventionData.DataForAmountTest), MemberType = typeof(InterventionData))]
    public void Amount_InlineData_Success(Intervention intervention, double amount)
    {
        Assert.Equal(amount, intervention.Amount);
    }

    [Theory]
    [MemberData(nameof(InterventionData.DataForCheckHoursTest), MemberType = typeof(InterventionData))]
    public void CheckHours_InlineData_Success(Intervention intervention, double dayHours, double nightHours, double specialHours, double totalHours)
    {
        Assert.Equal(dayHours, intervention.DayHours);
        Assert.Equal(nightHours, intervention.NightHours);
        Assert.Equal(specialHours, intervention.SpecialHours);
        Assert.Equal(totalHours, intervention.TotalHours);
    }
}