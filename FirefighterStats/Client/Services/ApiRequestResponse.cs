// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Client" file="ApiRequestResponse.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Client.Services;

using System.Diagnostics.CodeAnalysis;

public class ApiRequestResponse<T>
{
    public ApiRequestResponse(T? result)
    {
        IsSuccess = true;
        Result = result;
    }

    public ApiRequestResponse(string errors)
    {
        IsSuccess = false;
        Errors = errors;
    }

    public string? Errors { get; }

    [MemberNotNullWhen(true, nameof(Result))]
    [MemberNotNullWhen(false, nameof(Errors))]
    public bool IsSuccess { get; }

    public T? Result { get; }
}