using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace Notalone.API.HealthChecks;

internal class LivenessHealthCheck : IHealthCheck
{
    private readonly ILogger<LivenessHealthCheck> _logger;

    public LivenessHealthCheck(ILogger<LivenessHealthCheck> logger)
    {
        _logger = logger;
    }

    public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("LivenessHealthCheck executed.");
        return Task.FromResult(HealthCheckResult.Healthy());
    }
}