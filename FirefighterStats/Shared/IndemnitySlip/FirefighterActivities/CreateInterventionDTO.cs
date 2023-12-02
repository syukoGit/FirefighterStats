// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Shared" file="CreateInterventionDTO.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Shared.IndemnitySlip.FirefighterActivities;

using FirefighterStats.Shared.ValidationAttributes;

public class CreateInterventionDTO
{
    public required ECalculatorVersion CalculatorVersion { get; set; }

    [After(nameof(StartDateTime))]
    public required DateTime EndDateTime { get; set; }

    public required EInterventionType InterventionType { get; set; }

    public required int Number { get; set; }

    public required DateTime StartDateTime { get; set; }

    public required string Title { get; set; }

    public required double UnitAmount { get; set; }
}
