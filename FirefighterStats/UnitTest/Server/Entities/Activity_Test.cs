// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.UnitTest" file="Activity_Test.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.UnitTest.Server.Entities;

using FirefighterStats.Server.Entities.FirefighterActivities;
using FirefighterStats.UnitTest.Server.Entities.TestData;

public class Activity_Test
{
    [Theory]
    [MemberData(nameof(ActivityData.DataForAmountTest), MemberType = typeof(ActivityData))]
    public void Amount_MemberData_Success(Activity activity, double amount)
    {
        Assert.Equal(amount, activity.Amount);
    }

    [Theory]
    [MemberData(nameof(ActivityData.DataForDurationInHoursTest), MemberType = typeof(ActivityData))]
    public void DurationInHours_MemberData_Success(Activity activity, double durationInHours)
    {
        Assert.Equal(durationInHours, activity.DurationInHours);
    }
}