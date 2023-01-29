// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Server" file="AutoMapperProfile.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Server.Helpers;

using AutoMapper;
using FirefighterStats.Server.Entities;
using FirefighterStats.Shared.Firefighter;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Firefighter, FirefighterDTO>();
        CreateMap<UpdateFirefighterPropsDTO, Firefighter>();
    }
}