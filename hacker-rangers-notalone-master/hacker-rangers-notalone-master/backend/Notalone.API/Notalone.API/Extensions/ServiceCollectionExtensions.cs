using Microsoft.AspNetCore.Authentication;
using Notalone.API.HealthChecks;
using Notalone.API.Infrastructure.Auth;

namespace Notalone.API.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddControllersAndAuth(this IServiceCollection services)
    {
        services.AddCustomHealthChecks();
        services.AddAuthentication("BasicAuthentication")
            .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", null);
            
        services.AddControllers();
        return services;
    }

    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped<IUserService, UserService>();
        return services;
    }
}