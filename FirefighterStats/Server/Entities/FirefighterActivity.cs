// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Server" file="FirefighterActivity.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Server.Entities;

using System.ComponentModel.DataAnnotations;

public abstract class FirefighterActivity
{
    public abstract double Amount { get; }

    public virtual required DateTime EndDateTime { get; set; }

    [Key]
    public required string Id { get; set; }

    public virtual required DateTime StartDateTime { get; set; }

    public required string Title { get; set; }

    public required double UnitAmount { get; set; }
}