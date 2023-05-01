using System.Diagnostics;
using System.Text.Json;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Notalone.API.HealthChecks;

namespace Notalone.API.Extensions;

public static class ApplicationBuilderExtensions
{
    public static IApplicationBuilder UseCustomSwagger(this IApplicationBuilder app)
    {
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "Notalone API V1");
        });
        return app;
    }
    
    public static IApplicationBuilder UseCustomExceptionHandler(this IApplicationBuilder app)
    {
        app.UseExceptionHandler(errorApp =>
            {
                errorApp.Run(async context =>
                {
                    var errorFeature = context.Features.Get<IExceptionHandlerFeature>();
                    var exception = errorFeature?.Error;
 
                    // https://tools.ietf.org/html/rfc7807#section-3.1
                    var problemDetails = new ProblemDetails
                    {
                        Type = $"https://example.com/problem-types/{exception?.GetType().Name}",
                        Title = "An unexpected error occurred!",
                        Detail = "Something went wrong",
                        Instance = errorFeature switch
                        {
                            ExceptionHandlerFeature e => e.Path,
                            _ => "unknown"
                        },
                        Status = StatusCodes.Status400BadRequest,
                        Extensions =
                        {
                            ["trace"] = Activity.Current?.Id ?? context?.TraceIdentifier
                        }
                    };
 
                    await JsonSerializer.SerializeAsync(context.Response.Body, problemDetails);
                });
            });
        return app;
    }

    public static IApplicationBuilder BuildApp(this IApplicationBuilder app)
    {
        app.UseCustomHealthChecks();
        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        return app;
    }
}