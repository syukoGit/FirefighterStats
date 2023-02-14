// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Server" file="Intervention.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Server.Entities.FirefighterActivities;

using System.ComponentModel.DataAnnotations;
using FirefighterStats.Shared.IndemnitySlip.FirefighterActivities;
using FirefighterStats.Shared.Utils;
using JetBrains.Annotations;

[UsedImplicitly]
public class Intervention
{
    private static readonly Percentage s_dayRate = "100%";

    private static readonly Percentage s_nightRate = "200%";

    private static readonly Percentage s_specialRate = "150%";

    private DateTime _endDateTime = DateTime.MinValue;

    private DateTime _startDateTime = DateTime.MinValue;

    public double Amount => Math.Round((DayHours * s_dayRate + NightHours * s_nightRate + SpecialHours * s_specialRate) * UnitAmount, 2);

    public double DayHours { get; private set; }

    public required DateTime EndDateTime
    {
        get => _endDateTime;

        set
        {
            _endDateTime = value;
            CalculateHours();
        }
    }

    [Key]
    public required string Id { get; set; }

#pragma warning disable CS8618
    public IndemnitySlip IndemnitySlip { get; set; }
#pragma warning restore CS8618

    public required EInterventionType InterventionType { get; set; }

    public double NightHours { get; private set; }

    public required int Number { get; set; }

    public double SpecialHours { get; private set; }

    public required DateTime StartDateTime
    {
        get => _startDateTime;

        set
        {
            _startDateTime = value;
            CalculateHours();
        }
    }

    public required string Title { get; set; }

    public double TotalHours => DayHours + NightHours + SpecialHours;

    public required double UnitAmount { get; set; }

    private void CalculateHours()
    {
        if (StartDateTime == DateTime.MinValue || EndDateTime == DateTime.MinValue)
        {
            return;
        }

        var nightMinutes = 0;
        var specialMinutes = 0;
        var dayMinutes = 0;

        DateTime start = StartDateTime;

        while (start < EndDateTime)
        {
            if (start.Hour is < 7 or >= 22)
            {
                nightMinutes++;
            }
            else if (start.DayOfWeek == DayOfWeek.Sunday)
            {
                specialMinutes++;
            }
            else
            {
                dayMinutes++;
            }

            start = start.AddMinutes(1);
        }

        NightHours = Math.Round(nightMinutes / 60.0, 2);
        SpecialHours = Math.Round(specialMinutes / 60.0, 2);
        DayHours = Math.Round(dayMinutes / 60.0, 2);
    }
}