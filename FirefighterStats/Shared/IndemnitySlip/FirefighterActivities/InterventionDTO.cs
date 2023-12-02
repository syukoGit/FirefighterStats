// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Shared" file="InterventionDTO.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Shared.IndemnitySlip.FirefighterActivities;

public class InterventionDTO
{
    public required double Amount { get; set; }

    public required ECalculatorVersion CalculatorVersion { get; set; }

    public required double DayHours { get; set; }

    public required DateTime EndDateTime { get; set; }

    public required string Id { get; set; }

    public required EInterventionType InterventionType { get; set; }

    public required double NightHours { get; set; }

    public required int Number { get; set; }

    public required double SpecialHours { get; set; }

    public required DateTime StartDateTime { get; set; }

    public required string Title { get; set; }

    public required double TotalHours { get; set; }

    public required double UnitAmount { get; set; }
}
