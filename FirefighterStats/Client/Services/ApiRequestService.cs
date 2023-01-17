// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Client" file="ApiRequestService.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Client.Services;

using System.Diagnostics.CodeAnalysis;
using System.Net;
using System.Net.Http.Json;
using System.Text.Json;

public class ApiRequestService
{
    private readonly HttpClient _httpClient;

    private readonly JsonSerializerOptions _serializerOptions = new ()
    {
        PropertyNameCaseInsensitive = true,
    };

    public ApiRequestService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<ApiRequestResponse<T>> GetFromJsonAsync<T>([StringSyntax("Uri")] string requestUri)
    {
        HttpResponseMessage response = await _httpClient.GetAsync(requestUri);

        if (response.IsSuccessStatusCode)
        {
            string resultStr = await response.Content.ReadAsStringAsync();

            var result = JsonSerializer.Deserialize<T>(resultStr, _serializerOptions);

            return new ApiRequestResponse<T>(true)
            {
                Result = result,
            };
        }

        switch (response.StatusCode)
        {
            case HttpStatusCode.InternalServerError:
                return new ApiRequestResponse<T>(false)
                {
                    Errors = "Internal server error",
                };
            case HttpStatusCode.Unauthorized:
                return new ApiRequestResponse<T>(false)
                {
                    Errors = "Unauthorized",
                };

            default:
            {
                string errors = await response.Content.ReadAsStringAsync();

                return new ApiRequestResponse<T>(false)
                {
                    Errors = errors,
                };
            }
        }
    }

    public async Task<ApiRequestResponse<T>> PostAsJsonAsync<T>([StringSyntax("Uri")] string requestUri, object data)
    {
        HttpResponseMessage response = await _httpClient.PostAsJsonAsync(requestUri, data, _serializerOptions);

        if (response.IsSuccessStatusCode)
        {
            string resultStr = await response.Content.ReadAsStringAsync();

            var result = JsonSerializer.Deserialize<T>(resultStr, _serializerOptions);

            return new ApiRequestResponse<T>(true)
            {
                Result = result,
            };
        }

        switch (response.StatusCode)
        {
            case HttpStatusCode.InternalServerError:
                return new ApiRequestResponse<T>(false)
                {
                    Errors = "Internal server error",
                };
            case HttpStatusCode.Unauthorized:
                return new ApiRequestResponse<T>(false)
                {
                    Errors = "Unauthorized",
                };

            default:
            {
                string errors = await response.Content.ReadAsStringAsync();

                return new ApiRequestResponse<T>(false)
                {
                    Errors = errors,
                };
            }
        }
    }
}