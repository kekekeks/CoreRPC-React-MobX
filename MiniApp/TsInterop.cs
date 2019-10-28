using System;
using System.Collections.Generic;
using System.Linq;
using CoreRPC.AspNetCore;
using CoreRPC.Routing;
using CoreRPC.Typescript;
using Microsoft.AspNetCore.Builder;
using Newtonsoft.Json.Serialization;

namespace MiniApp
{
    public static class TsInterop
    {
        public static string GenerateTsRpc() => GenerateInternalTsRpc();

        static void Configure(TypescriptGenerationOptions config)
        {
            var orig = config.ApiFieldNamingPolicy;
            config.ApiFieldNamingPolicy = type => orig(type).Replace("Rpc", "");
            config.DtoFieldNamingPolicy = TypescriptGenerationOptions.ToCamelCase;
            config.CustomTypeMapping = _ => null;
            config.CustomTsTypeMapping = (type, _) =>
            {
                if (type == typeof(object)) return "any";
                if (type == typeof(decimal)) return "number";
                if (type == typeof(Guid)) return "string";
                return null;
            };
        }

        static string GenerateInternalTsRpc() =>
            AspNetCoreRpcTypescriptGenerator.GenerateCode(GetRpcTypes(), Configure);



        private static IEnumerable<Type> GetRpcTypes()
        {
            var types = typeof(Program).Assembly.GetTypes()
                .Where(type => typeof(IHttpContextAwareRpc).IsAssignableFrom(type) && !type.IsAbstract)
                .ToList();
            return types;
        }

        public static void Register(IApplicationBuilder app) => app.UseCoreRpc("/tsrpc", config =>
        {
            config.RpcTypeResolver = GetRpcTypes;
            config.JsonSerializer.ContractResolver = new FixedJsonContractResolver();
        });

        public class FixedJsonContractResolver : CamelCasePropertyNamesContractResolver
        {
            public FixedJsonContractResolver()
            {
                ((CamelCaseNamingStrategy) NamingStrategy).ProcessDictionaryKeys = false;
            }
        }
    }
}