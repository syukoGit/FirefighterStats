// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.UnitTest" file="ActivityData.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.UnitTest.Server.Entities.TestData;

using System.Globalization;
using FirefighterStats.Server.Entities.FirefighterActivities;

public class ActivityData
{
    private const string DateTimeFormat = "dd/MM/yyyy HH:mm";

    private static readonly List<ActivityTestData> s_activities = new ()
    {
        new ActivityTestData(GetActivity("08/11/2020 13:00", "08/11/2020 19:00", 9), 6, 4.28),
        new ActivityTestData(GetActivity("29/11/2020 07:00", "29/11/2020 19:00", 9), 12, 8.55),
        new ActivityTestData(GetActivity("05/09/2020 15:00", "05/09/2020 16:30", 75), 1.5, 8.91),
    };

    public static IEnumerable<object[]> DataForAmountTest { get; } = s_activities.Select(static c => new object[]
    {
        c.Activity,
        c.Amount,
    });

    public static IEnumerable<object[]> DataForDurationInHoursTest { get; } = s_activities.Select(static c => new object[]
    {
        c.Activity,
        c.DurationInHours,
    });

    private static Activity GetActivity(string strStart, string strEnd, double rate)
    {
        DateTime startDateTime = DateTime.ParseExact(strStart, DateTimeFormat, CultureInfo.InvariantCulture);

        DateTime endDateTime = DateTime.ParseExact(strEnd, DateTimeFormat, CultureInfo.InvariantCulture);

        return new Activity
        {
            StartDateTime = startDateTime,
            EndDateTime = endDateTime,
            Rate = rate,
            Id = string.Empty,
            UnitAmount = 7.92,
            Title = string.Empty,
        };
    }

    private sealed record ActivityTestData(Activity Activity, double DurationInHours, double Amount);
}