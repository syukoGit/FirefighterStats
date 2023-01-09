// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Client" file="ApiAuthenticationStateProvider.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Client.Authentication;

using System.Security.Claims;
using System.Text.Json;
using Blazored.LocalStorage;
using Microsoft.AspNetCore.Components.Authorization;

public class ApiAuthenticationStateProvider : AuthenticationStateProvider
{
    private const string AuthTokenExpirationLocalStorageKey = "authTokenExpiration";

    private const string AuthTokenLocalStorageKey = "authToken";

    private readonly ILocalStorageService _localStorage;

    public ApiAuthenticationStateProvider(ILocalStorageService localStorage)
    {
        _localStorage = localStorage;
    }

    /// <inheritdoc />
    public override async Task<AuthenticationState> GetAuthenticationStateAsync()
    {
        (string AuthToken, DateTime ExpirationDateTime)? authTokenAndExpiration = await GetAuthToken();

        if (authTokenAndExpiration == null)
        {
            return new AuthenticationState(new ClaimsPrincipal());
        }

        (string authToken, DateTime expirationDateTime) = authTokenAndExpiration.Value;

        if (expirationDateTime <= DateTime.Now)
        {
            await ClearAuthToken();
            return new AuthenticationState(new ClaimsPrincipal());
        }

        var claimsIdentity = new ClaimsIdentity(ParseClaimsFromJwt(authToken), "jwt");
        var claims = new ClaimsPrincipal(claimsIdentity);

        return new AuthenticationState(claims);
    }

    public async Task MarkUserAsAuthenticated(string username, string token, DateTime expiration)
    {
        await SetAuthToken(token, expiration);

        Claim[] claims =
        {
            new (ClaimTypes.Name, username),
        };

        ClaimsIdentity claimsIdentity = new (claims, "apiAuth");

        ClaimsPrincipal authenticatedUser = new (claimsIdentity);
        Task<AuthenticationState> authState = Task.FromResult(new AuthenticationState(authenticatedUser));

        NotifyAuthenticationStateChanged(authState);
    }

    public async Task MarkUserAsLoggedOut()
    {
        await ClearAuthToken();

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

    private async Task ClearAuthToken()
    {
        await _localStorage.RemoveItemsAsync(new[]
        {
            AuthTokenLocalStorageKey,
            AuthTokenExpirationLocalStorageKey,
        });
    }

    private async Task<(string AuthToken, DateTime ExpirationDateTime)?> GetAuthToken()
    {
        var authToken = await _localStorage.GetItemAsync<string?>(AuthTokenLocalStorageKey);
        var expiration = await _localStorage.GetItemAsync<DateTime?>(AuthTokenExpirationLocalStorageKey);

        return authToken == null || expiration == null
                   ? null
                   : (authToken, expiration.Value);
    }

    private async Task SetAuthToken(string authToken, DateTime expiration)
    {
        await _localStorage.SetItemAsync(AuthTokenLocalStorageKey, authToken);
        await _localStorage.SetItemAsync(AuthTokenExpirationLocalStorageKey, expiration);
    }
}