// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Client" file="ApiRequestResponse.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Client.Services;

public class ApiRequestResponse<T>
{
    public ApiRequestResponse(bool success)
    {
        Success = success;
    }

    public string? Errors { get; init; }

    public T? Result { get; init; }

    public bool Success { get; }
}