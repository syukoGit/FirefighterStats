// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Server" file="Intervention.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Server.Entities.FirefighterActivities;

using System.ComponentModel.DataAnnotations;
using FirefighterStats.Server.Helpers.Calculators;
using FirefighterStats.Shared.IndemnitySlip.FirefighterActivities;
using FirefighterStats.Shared.Utils;
using JetBrains.Annotations;

[UsedImplicitly]
public class Intervention
{
    private static readonly Percentage s_dayRate = "100%";

    private static readonly Percentage s_nightRate = "200%";

    private static readonly Percentage s_specialRate = "150%";

    private Calculator _calculator = new CalculatorV2();

    private ECalculatorVersion _calculatorVersion;

    private DateTime _endDateTime = DateTime.MinValue;

    private DateTime _startDateTime = DateTime.MinValue;

    public double Amount => Math.Round((DayHours * s_dayRate + NightHours * s_nightRate + SpecialHours * s_specialRate) * UnitAmount, 2);

    public ECalculatorVersion CalculatorVersion
    {
        get => _calculatorVersion;

        set
        {
            _calculatorVersion = value;

            _calculator = Calculator.CreateCalculator(value);
        }
    }

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
        (DayHours, SpecialHours, NightHours) = _calculator.CalculateHours(StartDateTime, EndDateTime);
    }
}
