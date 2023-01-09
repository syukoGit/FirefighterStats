// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Client" file="AuthenticationService.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Client.Services;

using FirefighterStats.Client.Authentication;
using FirefighterStats.Shared.Authentication;
using Microsoft.AspNetCore.Components.Authorization;

public class AuthenticationService
{
    private readonly ApiRequestService _apiRequestService;

    private readonly ApiAuthenticationStateProvider _authenticationStateProvider;

    public AuthenticationService(AuthenticationStateProvider authenticationStateProvider, ApiRequestService apiRequestService)
    {
        _authenticationStateProvider = (ApiAuthenticationStateProvider) authenticationStateProvider;
        _apiRequestService = apiRequestService;
    }

    public async Task<string?> Login(LoginDTO login)
    {
        ApiRequestResponse<LoginResultDTO> result = await _apiRequestService.PostAsJsonAsync<LoginResultDTO>("api/Account/login", login);

        if (!result.Success)
        {
            return result.Errors;
        }

        if (result.Result == null)
        {
            return "empty response";
        }

        await _authenticationStateProvider.MarkUserAsAuthenticated(login.UserName, result.Result.Token, result.Result.Expiration);

        return null;
    }

    public async Task Logout()
    {
        await _authenticationStateProvider.MarkUserAsLoggedOut();
    }

    public async Task<string?> Register(RegisterDTO registerDTO)
    {
        ApiRequestResponse<RegisterResultDTO> result = await _apiRequestService.PostAsJsonAsync<RegisterResultDTO>("api/Account/register", registerDTO);

        if (!result.Success)
        {
            return result.Errors;
        }

        if (result.Result == null)
        {
            return "empty response";
        }

        await _authenticationStateProvider.MarkUserAsAuthenticated(registerDTO.UserName, result.Result.Token, result.Result.Expiration);

        return null;
    }
}