// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Server" file="IndemnitySlipsController.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Server.Controllers.Firefighters;

using System.Security.Claims;
using AutoMapper;
using FirefighterStats.Server.Data;
using FirefighterStats.Server.Entities;
using FirefighterStats.Shared.IndemnitySlip;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/Firefighters/{firefighter}/[controller]")]
[ApiController]
[Authorize]
public class IndemnitySlipsController : ControllerBase
{
    private readonly ApplicationDbContext _database;

    private readonly IMapper _mapper;

    public IndemnitySlipsController(ApplicationDbContext database, IMapper mapper)
    {
        _database = database;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<IndemnitySlipDTO>>> Get(string firefighter)
    {
        ActionResult? canAccess = await CanAccessData(firefighter);

        if (canAccess != null)
        {
            return canAccess;
        }

        Firefighter user = await _database.Users.AsNoTracking().Include(static c => c.IndemnitySlips).FirstAsync(x => x.UserName == firefighter);

        return Ok(_mapper.Map<IEnumerable<IndemnitySlipDTO>>(user.IndemnitySlips));
    }

    [HttpPost]
    public async Task<ActionResult<IndemnitySlipDTO>> Post(string firefighter, [FromBody] CreateIndemnitySlipDTO dto)
    {
        ActionResult? canAccess = await CanAccessData(firefighter);

        if (canAccess != null)
        {
            return canAccess;
        }

        Firefighter user = await _database.Users.Include(static c => c.IndemnitySlips).FirstAsync(x => x.UserName == firefighter);

        var indemnitySlip = _mapper.Map<IndemnitySlip>(dto);

        user.IndemnitySlips.Add(indemnitySlip);

        await _database.SaveChangesAsync();

        return Ok(_mapper.Map<IndemnitySlipDTO>(indemnitySlip));
    }

    [HttpDelete("{indemnitySlipId}")]
    public async Task<ActionResult> Delete(string firefighter, string indemnitySlipId)
    {
        ActionResult? canAccess = await CanAccessData(firefighter);

        if (canAccess != null)
        {
            return canAccess;
        }

        Firefighter user = await _database.Users.Include(static c => c.IndemnitySlips).FirstAsync(x => x.UserName == firefighter);

        IndemnitySlip? indemnitySlip = user.IndemnitySlips.FirstOrDefault(c => c.Id == indemnitySlipId);

        if (indemnitySlip == null)
        {
            return NotFound($"Not found indemnity slip with identifier {indemnitySlipId}.");
        }

        user.IndemnitySlips.Remove(indemnitySlip);

        _database.Remove(indemnitySlip);
        await _database.SaveChangesAsync();

        return Ok();
    }

    private async Task<ActionResult?> CanAccessData(string firefighter)
    {
        Firefighter? user = await _database.Users.AsNoTracking().FirstOrDefaultAsync(x => x.UserName == firefighter);

        return user == null
                   ? NotFound()
                   : string.IsNullOrEmpty(user.UserName) || !User.HasClaim(ClaimTypes.NameIdentifier, user.UserName)
                       ? Unauthorized()
                       : null;
    }
}