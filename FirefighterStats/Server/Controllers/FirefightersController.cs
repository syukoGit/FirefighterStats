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
public class FirefightersController : ControllerBase
{
    private readonly ApplicationDbContext _database;

    private readonly IMapper _mapper;

    public FirefightersController(ApplicationDbContext database, IMapper mapper)
    {
        _database = database;
        _mapper = mapper;
    }

    [HttpGet("")]
    public IEnumerable<FirefighterDTO> Get()
    {
        return _mapper.Map<List<FirefighterDTO>>(_database.Users.ToList());
    }

    [HttpGet("{username}")]
    public async Task<ActionResult<FirefighterDTO>> Get(string username)
    {
        Firefighter? firefighter = await _database.Users.FirstOrDefaultAsync(x => x.UserName == username);

        return firefighter == null
                   ? NotFound()
                   : _mapper.Map<FirefighterDTO>(firefighter);
    }

    [HttpPut("{username}")]
    public async Task<ActionResult<FirefighterDTO>> Patch(string username, [FromBody] UpdateFirefighterPropsDTO patch)
    {
        Firefighter? user = await _database.Users.FirstOrDefaultAsync(x => x.UserName == username);

        if (user == null)
        {
            return NotFound();
        }

        if (string.IsNullOrEmpty(user.UserName) || !User.HasClaim(ClaimTypes.NameIdentifier, user.UserName))
        {
            return Unauthorized();
        }

        _mapper.Map(patch, user);
        await _database.SaveChangesAsync();

        return _mapper.Map<FirefighterDTO>(user);
    }
}