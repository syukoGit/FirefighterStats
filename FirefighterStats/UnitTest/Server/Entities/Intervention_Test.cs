// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.UnitTest" file="Intervention_Test.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.UnitTest.Server.Entities;

using System.Globalization;
using FirefighterStats.Server.Entities.FirefighterActivities;
using FirefighterStats.Shared.IndemnitySlip.FirefighterActivities;

public class Intervention_Test
{
    private const string DateTimeFormat = "g";

    [Theory]
    [InlineData("06/11/2020 19:39", "06/11/2020 21:54", 17.82)]
    [InlineData("07/11/2020 03:41", "07/11/2020 06:00", 36.75)]
    [InlineData("18/10/2020 14:25", "18/10/2020 16:49", 28.51)]
    [InlineData("29/11/2020 05:37", "29/11/2020 07:45", 30.77)]
    public void Amount_InlineData_Success(string startStr, string endStr, double amount)
    {
        DateTime start = DateTime.ParseExact(startStr, DateTimeFormat, CultureInfo.CurrentCulture);
        DateTime end = DateTime.ParseExact(endStr, DateTimeFormat, CultureInfo.CurrentCulture);

        Intervention intervention = GetIntervention(start, end);

        Assert.Equal(amount, intervention.Amount);
    }

    [Theory]
    [InlineData("06/11/2020 19:39", "06/11/2020 21:54", 2.25, 0, 0, 2.25)]
    [InlineData("07/11/2020 03:41", "07/11/2020 06:00", 0, 2.32, 0, 2.32)]
    [InlineData("18/10/2020 14:25", "18/10/2020 16:49", 0, 0, 2.40, 2.40)]
    [InlineData("29/11/2020 05:37", "29/11/2020 07:45", 0, 1.38, 0.75, 2.13)]
    public void CheckHours_InlineData_Success(string startStr, string endStr, double dayHours, double nightHours, double specialHours, double totalHours)
    {
        DateTime start = DateTime.ParseExact(startStr, DateTimeFormat, CultureInfo.CurrentCulture);
        DateTime end = DateTime.ParseExact(endStr, DateTimeFormat, CultureInfo.CurrentCulture);

        Intervention intervention = GetIntervention(start, end);

        Assert.Equal(dayHours, intervention.DayHours);
        Assert.Equal(nightHours, intervention.NightHours);
        Assert.Equal(specialHours, intervention.SpecialHours);
        Assert.Equal(totalHours, intervention.TotalHours);
    }

    private static Intervention GetIntervention(DateTime startDateTime, DateTime endDateTime)
    {
        return new Intervention
        {
            StartDateTime = startDateTime,
            EndDateTime = endDateTime,
            Id = string.Empty,
            Number = 34,
            InterventionType = EInterventionType.Fire,
            Title = string.Empty,
            UnitAmount = 7.92,
        };
    }
}