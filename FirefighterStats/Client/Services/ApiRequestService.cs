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

        return response.IsSuccessStatusCode
                   ? await ProcessResultAsync<T>(response)
                   : await ProcessErrorsAsync<T>(response);
    }

    public async Task<ApiRequestResponse<T>> PostAsJsonAsync<T>([StringSyntax("Uri")] string requestUri, object data)
    {
        HttpResponseMessage response = await _httpClient.PostAsJsonAsync(requestUri, data, _serializerOptions);

        return response.IsSuccessStatusCode
                   ? await ProcessResultAsync<T>(response)
                   : await ProcessErrorsAsync<T>(response);
    }

    public async Task<ApiRequestResponse<T>> PutAsJsonAsync<T>([StringSyntax("Uri")] string requestUri, object data)
    {
        HttpResponseMessage response = await _httpClient.PutAsJsonAsync(requestUri, data, _serializerOptions);

        return response.IsSuccessStatusCode
                   ? await ProcessResultAsync<T>(response)
                   : await ProcessErrorsAsync<T>(response);
    }

    private static async Task<ApiRequestResponse<T>> ProcessErrorsAsync<T>(HttpResponseMessage response)
    {
        return response.StatusCode switch
        {
            HttpStatusCode.InternalServerError => new ApiRequestResponse<T>("Internal server error"),
            HttpStatusCode.Unauthorized => new ApiRequestResponse<T>("Unauthorized"),
            _ => new ApiRequestResponse<T>(await response.Content.ReadAsStringAsync()),
        };
    }

    private async Task<ApiRequestResponse<T>> ProcessResultAsync<T>(HttpResponseMessage response)
    {
        string resultStr = await response.Content.ReadAsStringAsync();

        var result = JsonSerializer.Deserialize<T>(resultStr, _serializerOptions);

        return new ApiRequestResponse<T>(result);
    }
}