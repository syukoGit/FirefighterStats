// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Shared" file="EInterventionType.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Shared.IndemnitySlip.FirefighterActivities;

using System.ComponentModel.DataAnnotations;

public enum EInterventionType
{
    [Display(Name = "Operation diverse")]
    OtherOperation,

    [Display(Name = "SAP")]
    PersonalAssistance,

    [Display(Name = "Feu")]
    Fire,

    [Display(Name = "AVP")]
    // Accident on Public Road
    Apr,

    [Display(Name = "Feu & AVP")]
    FireAndApr,
}