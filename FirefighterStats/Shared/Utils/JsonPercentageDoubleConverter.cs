// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Shared" file="JsonPercentageDoubleConverter.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Shared.Utils;

using System.Text.Json;
using System.Text.Json.Serialization;

public class JsonPercentageDoubleConverter : JsonConverter<Percentage>
{
    /// <inheritdoc />
    public override bool CanConvert(Type typeToConvert)
    {
        return typeof(Percentage) == typeToConvert;
    }

    /// <inheritdoc />
    public override Percentage Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        return reader.TokenType switch
        {
            JsonTokenType.Number => reader.GetDouble(),
            JsonTokenType.String => reader.GetString(),
            _ => throw new JsonException(),
        };
    }

    /// <inheritdoc />
    public override void Write(Utf8JsonWriter writer, Percentage value, JsonSerializerOptions options)
    {
        writer.WriteNumberValue(value);
    }
}