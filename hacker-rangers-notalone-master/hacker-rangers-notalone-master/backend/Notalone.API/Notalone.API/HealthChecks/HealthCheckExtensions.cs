using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Options;

namespace Notalone.API.HealthChecks;

public static class HealthCheckExtensions
{
    private const string LivenessTag = "Liveness";
    private const string ReadinessTag = "Readiness";

    public static void AddCustomHealthChecks(this IServiceCollection services)
    {
        services.AddSingleton<LivenessHealthCheck>();
        services.AddSingleton<ReadinessHealthCheck>();
        services.AddHealthChecks()
            .AddCheck<LivenessHealthCheck>("Liveness", HealthStatus.Unhealthy, new[] { LivenessTag })
            .AddCheck<ReadinessHealthCheck>("Readiness", HealthStatus.Unhealthy, new[] { ReadinessTag });
    }

    public static void UseCustomHealthChecks(this IApplicationBuilder app)
    {
        app.Map(new PathString("/health/live"), appBuilder => {
            appBuilder.UseMiddleware<HealthCheckMiddleware>(Options.Create(new HealthCheckOptions
            {
                Predicate = check => check.Tags.Contains(LivenessTag),
                AllowCachingResponses = false
            }));
        });

        app.Map(new PathString("/health/ready"), appBuilder => {
            appBuilder.UseMiddleware<HealthCheckMiddleware>(Options.Create(new HealthCheckOptions
            {
                Predicate = check => check.Tags.Contains(ReadinessTag),
                AllowCachingResponses = false
            }));
        });
    }
}