// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Shared" file="EFirefighterRank.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Shared.Firefighter;

using System.ComponentModel.DataAnnotations;
using JetBrains.Annotations;

[PublicAPI]
public enum EFirefighterRank
{
    [Display(Name = "Sapeur 2e classe")]
    Sapeur2EmeClasse,

    [Display(Name = "Sapeur 1er classe")]
    Sapeur1EreClasse,

    Caporal,

    [Display(Name = "Caporal chef")]
    CaporalChef,

    Sergent,

    [Display(Name = "Sergent chef")]
    SergentChef,

    Adjudant,

    [Display(Name = "AdjudantChef")]
    AdjudantChef,

    Major,

    Lieutenant,

    Capitaine,

    Commandant,

    [Display(Name = "Lieutenant colonel")]
    LieutenantColonel,

    Colonel,
}