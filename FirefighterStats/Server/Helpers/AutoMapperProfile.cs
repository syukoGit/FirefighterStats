// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Server" file="AutoMapperProfile.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Server.Helpers;

using AutoMapper;
using FirefighterStats.Server.Entities;
using FirefighterStats.Server.Entities.FirefighterActivities;
using FirefighterStats.Shared.Firefighter;
using FirefighterStats.Shared.IndemnitySlip;
using FirefighterStats.Shared.IndemnitySlip.FirefighterActivities;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Firefighter, FirefighterDTO>();
        CreateMap<UpdateFirefighterPropsDTO, Firefighter>();

        CreateMap<IndemnitySlip, IndemnitySlipDTO>();
        CreateMap<CreateIndemnitySlipDTO, IndemnitySlip>();

        CreateMap<Activity, ActivityDTO>();
        CreateMap<CreateActivityDTO, Activity>();

        CreateMap<Intervention, InterventionDTO>();
        CreateMap<CreateInterventionDTO, Intervention>();

        CreateMap<IndemnitySlip, IndemnitySlipPreviewDTO>()
            .ForMember(static dest => dest.NumberActivities, static opt => opt.MapFrom(static src => src.Activities.Count))
            .ForMember(static dest => dest.NumberInterventions, static opt => opt.MapFrom(static src => src.Interventions.Count));
    }
}
