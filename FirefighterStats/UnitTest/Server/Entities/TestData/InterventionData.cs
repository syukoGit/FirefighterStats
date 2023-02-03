// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.UnitTest" file="InterventionData.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.UnitTest.Server.Entities.TestData;

using System.Globalization;
using FirefighterStats.Server.Entities.FirefighterActivities;
using FirefighterStats.Shared.IndemnitySlip.FirefighterActivities;

public class InterventionData
{
    private const string DateTimeFormat = "dd/MM/yyyy HH:mm";

    private static readonly List<InterventionTestData> s_firefighters = new ()
    {
        new InterventionTestData(GetIntervention("06/11/2020 19:39", "06/11/2020 21:54"), 17.82, 2.25, 0, 0, 2.25),
        new InterventionTestData(GetIntervention("07/11/2020 03:41", "07/11/2020 06:00"), 36.75, 0, 2.32, 0, 2.32),
        new InterventionTestData(GetIntervention("18/10/2020 14:25", "18/10/2020 16:49"), 28.51, 0, 0, 2.40, 2.40),
        new InterventionTestData(GetIntervention("29/11/2020 05:37", "29/11/2020 07:45"), 30.77, 0, 1.38, 0.75, 2.13),
    };

    public static IEnumerable<object[]> DataForAmountTest { get; } = s_firefighters.Select(static c => new object[]
    {
        c.Intervention,
        c.Amount,
    });

    public static IEnumerable<object[]> DataForCheckHoursTest { get; } = s_firefighters.Select(static c => new object[]
    {
        c.Intervention,
        c.DayHours,
        c.NightHours,
        c.SpecialHours,
        c.TotalHours,
    });

    private static Intervention GetIntervention(string strStart, string strEnd)
    {
        DateTime startDateTime = DateTime.ParseExact(strStart, DateTimeFormat, CultureInfo.InvariantCulture);

        DateTime endDateTime = DateTime.ParseExact(strEnd, DateTimeFormat, CultureInfo.InvariantCulture);

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

    private sealed record InterventionTestData(Intervention Intervention, double Amount, double DayHours, double NightHours, double SpecialHours,
                                               double TotalHours);
}