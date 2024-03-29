﻿// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Server" file="IndemnitySlipsController.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Server.Controllers.Firefighters;

using System.Security.Claims;
using AutoMapper;
using FirefighterStats.Server.Data;
using FirefighterStats.Server.Entities;
using FirefighterStats.Server.Entities.FirefighterActivities;
using FirefighterStats.Shared.IndemnitySlip;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/Firefighters/{firefighter}/[controller]")]
[ApiController]
[Authorize]
// ReSharper disable once SuggestBaseTypeForParameterInConstructor
public class IndemnitySlipsController(ApplicationDbContext database, IMapper mapper) : ControllerBase
{
    [HttpGet("")]
    public async Task<ActionResult<IEnumerable<IndemnitySlipPreviewDTO>>> GetAsync(string firefighter)
    {
        ActionResult? canAccess = await CanAccessData(firefighter);

        if (canAccess != null)
        {
            return canAccess;
        }

        Firefighter user = await database.Users.AsNoTracking().Include(static c => c.IndemnitySlips).FirstAsync(x => x.UserName == firefighter);

        return Ok(mapper.Map<IEnumerable<IndemnitySlipPreviewDTO>>(user.IndemnitySlips));
    }

    [HttpGet("{indemnitySlipId}")]
    public async Task<ActionResult<IndemnitySlipDTO>> GetAsync(string firefighter, string indemnitySlipId)
    {
        ActionResult? canAccess = await CanAccessData(firefighter);

        if (canAccess != null)
        {
            return canAccess;
        }

        Firefighter user = await database.Users.AsNoTracking().Include(static c => c.IndemnitySlips).FirstAsync(x => x.UserName == firefighter);

        IndemnitySlip? indemnitySlip = user.IndemnitySlips.FirstOrDefault(x => x.Id == indemnitySlipId);

        return indemnitySlip == null
                   ? NotFound()
                   : Ok(mapper.Map<IndemnitySlipDTO>(indemnitySlip));
    }

    [HttpPost("")]
    public async Task<ActionResult<IndemnitySlipDTO>> PostAsync(string firefighter, [FromBody] CreateIndemnitySlipDTO dto)
    {
        ActionResult? canAccess = await CanAccessData(firefighter);

        if (canAccess != null)
        {
            return canAccess;
        }

        Firefighter user = await database.Users.Include(static c => c.IndemnitySlips).FirstAsync(x => x.UserName == firefighter);

        var indemnitySlip = mapper.Map<IndemnitySlip>(dto);

        user.IndemnitySlips.Add(indemnitySlip);

        await database.SaveChangesAsync();

        return Ok(mapper.Map<IndemnitySlipDTO>(indemnitySlip));
    }

    [HttpDelete("{indemnitySlipId}")]
    public async Task<ActionResult> DeleteAsync(string firefighter, string indemnitySlipId)
    {
        ActionResult? canAccess = await CanAccessData(firefighter);

        if (canAccess != null)
        {
            return canAccess;
        }

        Firefighter user = await database.Users.Include(static c => c.IndemnitySlips).FirstAsync(x => x.UserName == firefighter);

        IndemnitySlip? indemnitySlip = user.IndemnitySlips.FirstOrDefault(c => c.Id == indemnitySlipId);

        if (indemnitySlip == null)
        {
            return NotFound($"Not found indemnity slip with identifier {indemnitySlipId}.");
        }

        user.IndemnitySlips.Remove(indemnitySlip);

        database.Remove(indemnitySlip);
        await database.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete("{indemnitySlipId}/Activities/{activityId}")]
    public async Task<ActionResult> DeleteActivityAsync(string firefighter, string indemnitySlipId, string activityId)
    {
        ActionResult? canAccess = await CanAccessData(firefighter);

        if (canAccess != null)
        {
            return canAccess;
        }

        Firefighter user = await database.Users.Include(static c => c.IndemnitySlips).FirstAsync(x => x.UserName == firefighter);

        IndemnitySlip? indemnitySlip = user.IndemnitySlips.FirstOrDefault(c => c.Id == indemnitySlipId);

        if (indemnitySlip == null)
        {
            return NotFound($"Not found indemnity slip with identifier {indemnitySlipId}.");
        }

        Activity? activity = indemnitySlip.Activities.FirstOrDefault(c => c.Id == activityId);

        if (activity == null)
        {
            return NotFound($"Not found activity with identifier {activityId}");
        }

        indemnitySlip.Activities.Remove(activity);

        await database.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete("{indemnitySlipId}/Interventions/{interventionId}")]
    public async Task<ActionResult> DeleteInterventionAsync(string firefighter, string indemnitySlipId, string interventionId)
    {
        ActionResult? canAccess = await CanAccessData(firefighter);

        if (canAccess != null)
        {
            return canAccess;
        }

        Firefighter user = await database.Users.Include(static c => c.IndemnitySlips).FirstAsync(x => x.UserName == firefighter);

        IndemnitySlip? indemnitySlip = user.IndemnitySlips.FirstOrDefault(c => c.Id == indemnitySlipId);

        if (indemnitySlip == null)
        {
            return NotFound($"Not found indemnity slip with identifier {indemnitySlipId}.");
        }

        Intervention? intervention = indemnitySlip.Interventions.FirstOrDefault(c => c.Id == interventionId);

        if (intervention == null)
        {
            return NotFound($"Not found intervention with identifier {interventionId}");
        }

        indemnitySlip.Interventions.Remove(intervention);

        await database.SaveChangesAsync();

        return Ok();
    }

    private async Task<ActionResult?> CanAccessData(string firefighter)
    {
        Firefighter? user = await database.Users.AsNoTracking().FirstOrDefaultAsync(x => x.UserName == firefighter);

        return user == null
                   ? NotFound($"User {firefighter} not found")
                   : string.IsNullOrEmpty(user.UserName) || !User.HasClaim(ClaimTypes.NameIdentifier, user.UserName)
                       ? Unauthorized()
                       : null;
    }
}
