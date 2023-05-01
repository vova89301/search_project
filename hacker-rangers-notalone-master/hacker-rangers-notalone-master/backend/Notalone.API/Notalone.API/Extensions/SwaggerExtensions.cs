using Microsoft.OpenApi.Models;

namespace Notalone.API.Extensions;

public static class SwaggerExtensions
{
    public static IServiceCollection AddCustomSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen();
        services.AddSwaggerGen(options =>
        {
            options.AddSecurityDefinition("basic", new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                Scheme = "basic",
                In = ParameterLocation.Header,
                Description = "Basic Authorization header using the Bearer scheme."
            });
 
            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "basic"
                        }
                    },
                    new string[] {}
                }
            });
                
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Version = "v1",
                Title = "Notalone API",
                Description = "A simple Core Web API",
                TermsOfService = new Uri("https://example.com/terms"),
            });
        });
        
        return services;
    }
}