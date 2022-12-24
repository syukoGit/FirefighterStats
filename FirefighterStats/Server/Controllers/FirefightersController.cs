// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Server" file="FirefightersController.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Server.Controllers;

using AutoMapper;
using FirefighterStats.Server.Data;
using FirefighterStats.Shared.Firefighter;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class FirefightersController : ControllerBase
{
    private readonly ApplicationDbContext _database;

    private readonly IMapper _mapper;

    public FirefightersController(ApplicationDbContext database, IMapper mapper)
    {
        _database = database;
        _mapper = mapper;
    }

    [HttpGet]
    public IEnumerable<FirefighterDTO> Get()
    {
        return _mapper.Map<List<FirefighterDTO>>(_database.Users.ToList());
    }
}