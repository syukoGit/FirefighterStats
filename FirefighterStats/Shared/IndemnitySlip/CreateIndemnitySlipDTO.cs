// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Shared" file="CreateIndemnitySlipDTO.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Shared.IndemnitySlip;

using System.ComponentModel.DataAnnotations;
using FirefighterStats.Shared.IndemnitySlip.FirefighterActivities;
using FirefighterStats.Shared.Utils;

public class CreateIndemnitySlipDTO
{
    public IEnumerable<CreateActivityDTO>? Activities { get; set; }

    public IEnumerable<CreateInterventionDTO>? Interventions { get; set; }

    [Required]
    public EMonth Month { get; set; }

    [Required]
    public int Year { get; set; }
}