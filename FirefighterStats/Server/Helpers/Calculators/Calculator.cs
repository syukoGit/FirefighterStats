// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Server" file="Calculator.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Server.Helpers.Calculators;

using FirefighterStats.Shared.IndemnitySlip.FirefighterActivities;

public abstract class Calculator
{
    public static Calculator CreateCalculator(ECalculatorVersion version)
    {
        return version switch
        {
            ECalculatorVersion.V1 => new CalculatorV1(),
            ECalculatorVersion.V2 => new CalculatorV2(),
            _ => throw new ArgumentException("Invalid version", nameof(version)),
        };
    }

    public abstract (double DayHours, double SpecialHours, double NightHours) CalculateHours(DateTime startDateTime, DateTime endDateTime);
}
