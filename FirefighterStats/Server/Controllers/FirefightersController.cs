// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Server" file="FirefightersController.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Server.Controllers;

using System.Security.Claims;
using AutoMapper;
using FirefighterStats.Server.Data;
using FirefighterStats.Server.Entities;
using FirefighterStats.Shared.Firefighter;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
[Authorize]
// ReSharper disable once SuggestBaseTypeForParameterInConstructor
public class FirefightersController(ApplicationDbContext database, IMapper mapper) : ControllerBase
{
    [HttpGet("")]
    public IEnumerable<FirefighterDTO> Get()
    {
        return mapper.Map<List<FirefighterDTO>>(database.Users.ToList());
    }

    [HttpGet("{username}")]
    public async Task<ActionResult<FirefighterDTO>> Get(string username)
    {
        Firefighter? firefighter = await database.Users.FirstOrDefaultAsync(x => x.UserName == username);

        return firefighter == null
                   ? NotFound()
                   : mapper.Map<FirefighterDTO>(firefighter);
    }

    [HttpPut("{username}")]
    public async Task<ActionResult<FirefighterDTO>> Patch(string username, [FromBody] UpdateFirefighterPropsDTO patch)
    {
        Firefighter? user = await database.Users.FirstOrDefaultAsync(x => x.UserName == username);

        if (user == null)
        {
            return NotFound();
        }

        if (string.IsNullOrEmpty(user.UserName) || !User.HasClaim(ClaimTypes.NameIdentifier, user.UserName))
        {
            return Unauthorized();
        }

        mapper.Map(patch, user);
        await database.SaveChangesAsync();

        return mapper.Map<FirefighterDTO>(user);
    }
}
