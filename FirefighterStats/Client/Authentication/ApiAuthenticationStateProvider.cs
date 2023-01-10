// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Client" file="ApiAuthenticationStateProvider.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Client.Authentication;

using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text.Json;
using Blazored.LocalStorage;
using Microsoft.AspNetCore.Components.Authorization;

public class ApiAuthenticationStateProvider : AuthenticationStateProvider
{
    private const string AuthenticationScheme = "bearer";

    private const string AuthenticationType = "jwt";

    private const string AuthTokenExpirationLocalStorageKey = "authTokenExpiration";

    private const string AuthTokenLocalStorageKey = "authToken";

    private const string ClaimNameType = "sub";

    private readonly HttpClient _httpClient;

    private readonly ILocalStorageService _localStorage;

    public ApiAuthenticationStateProvider(ILocalStorageService localStorage, HttpClient httpClient)
    {
        _localStorage = localStorage;
        _httpClient = httpClient;
    }

    /// <inheritdoc />
    public override async Task<AuthenticationState> GetAuthenticationStateAsync()
    {
        (string, DateTime)? authTokenAndExpiration = await GetAuthInfo();

        if (authTokenAndExpiration == null)
        {
            return new AuthenticationState(new ClaimsPrincipal());
        }

        (string token, DateTime expiration) = authTokenAndExpiration.Value;

        if (expiration <= DateTime.Now)
        {
            await ClearAuthInfo();
            return new AuthenticationState(new ClaimsPrincipal());
        }

        var claimsIdentity = new ClaimsIdentity(ParseClaimsFromJwt(token), AuthenticationType, ClaimNameType, ClaimsIdentity.DefaultRoleClaimType);

        var claims = new ClaimsPrincipal(claimsIdentity);

        return new AuthenticationState(claims);
    }

    public async Task MarkUserAsAuthenticated(string token, DateTime expiration)
    {
        await SetAuthInfo(token, expiration);

        ClaimsIdentity claimsIdentity = new (ParseClaimsFromJwt(token), AuthenticationType, ClaimNameType, ClaimsIdentity.DefaultRoleClaimType);

        ClaimsPrincipal authenticatedUser = new (claimsIdentity);
        Task<AuthenticationState> authState = Task.FromResult(new AuthenticationState(authenticatedUser));

        NotifyAuthenticationStateChanged(authState);
    }

    public async Task MarkUserAsLoggedOut()
    {
        await ClearAuthInfo();

        ClaimsPrincipal anonymousUser = new (new ClaimsIdentity());
        Task<AuthenticationState> authState = Task.FromResult(new AuthenticationState(anonymousUser));
        NotifyAuthenticationStateChanged(authState);
    }

    private static byte[] ParseBase64WithoutPadding(string base64)
    {
        switch (base64.Length % 4)
        {
            case 2:
                base64 += "==";
                break;
            case 3:
                base64 += "=";
                break;
        }

        return Convert.FromBase64String(base64);
    }

    private static IEnumerable<Claim> ParseClaimsFromJwt(string jwt)
    {
        List<Claim> claims = new ();
        string payload = jwt.Split('.')[1];
        byte[] jsonBytes = ParseBase64WithoutPadding(payload);

        var keyValuePairs = JsonSerializer.Deserialize<Dictionary<string, object>>(jsonBytes);

        if (keyValuePairs != null)
        {
            keyValuePairs.TryGetValue(ClaimTypes.Role, out object? values);

            if (values is string roles)
            {
                if (roles.Trim().StartsWith("[", StringComparison.Ordinal))
                {
                    string[]? parsedRoles = JsonSerializer.Deserialize<string[]>(roles);

                    if (parsedRoles != null)
                    {
                        claims.AddRange(parsedRoles.Select(static parsedRole => new Claim(ClaimTypes.Role, parsedRole)));
                    }
                }
                else
                {
                    claims.Add(new Claim(ClaimTypes.Role, roles));
                }

                keyValuePairs.Remove(ClaimTypes.Role);
            }

            claims.AddRange(keyValuePairs.Select(static kvp => new Claim(kvp.Key, kvp.Value.ToString() ?? string.Empty)));
        }

        return claims;
    }

    private async Task ClearAuthInfo()
    {
        await _localStorage.RemoveItemsAsync(new[]
        {
            AuthTokenLocalStorageKey,
            AuthTokenExpirationLocalStorageKey,
        });

        _httpClient.DefaultRequestHeaders.Authorization = null;
    }

    private async Task<(string AuthToken, DateTime ExpirationDateTime)?> GetAuthInfo()
    {
        var authToken = await _localStorage.GetItemAsync<string?>(AuthTokenLocalStorageKey);
        var expiration = await _localStorage.GetItemAsync<DateTime?>(AuthTokenExpirationLocalStorageKey);

        if (string.IsNullOrEmpty(authToken) || expiration == null)
        {
            return null;
        }

        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(AuthenticationScheme, authToken);

        return (authToken, expiration.Value);
    }

    private async Task SetAuthInfo(string authToken, DateTime expiration)
    {
        await _localStorage.SetItemAsync(AuthTokenLocalStorageKey, authToken);
        await _localStorage.SetItemAsync(AuthTokenExpirationLocalStorageKey, expiration);

        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(AuthenticationScheme, authToken);
    }
}