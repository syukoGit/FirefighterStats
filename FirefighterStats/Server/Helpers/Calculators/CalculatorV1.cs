// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Server" file="CalculatorV1.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Server.Helpers.Calculators;

public class CalculatorV1 : Calculator
{
    /// <inheritdoc />
    public override (double DayHours, double SpecialHours, double NightHours) CalculateHours(DateTime startDateTime, DateTime endDateTime)
    {
        if (startDateTime == DateTime.MinValue || endDateTime == DateTime.MinValue)
        {
            return (0, 0, 0);
        }

        var nightMinutes = 0;
        var specialMinutes = 0;
        var dayMinutes = 0;

        DateTime start = startDateTime;

        while (start < endDateTime)
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

        if (dayMinutes > 0)
        {
            dayMinutes += 30;
        }

        double nightHours = Math.Round(nightMinutes / 60.0, 2);
        double specialHours = Math.Round(specialMinutes / 60.0, 2);
        double dayHours = Math.Round(dayMinutes / 60.0, 2);

        return (dayHours, specialHours, nightHours);
    }
}
