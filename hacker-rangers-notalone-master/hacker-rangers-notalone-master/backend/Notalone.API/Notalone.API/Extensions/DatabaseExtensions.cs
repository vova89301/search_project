using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Notalone.API.Context;
using Notalone.API.Models;

namespace Notalone.API.Extensions;

public static class DatabaseExtensions
{
    public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        var databaseSection = configuration.GetSection("Database");
        var databaseSettings = databaseSection?.Get<DatabaseSettings>();
        services.Configure<DatabaseSettings>(databaseSection);

        if (databaseSettings is { PersistData: true, ConnectionString: not null })
        {
            services.AddEntityFrameworkSqlServer()
                .AddDbContext<IDatabaseContext, NotaloneDatabaseInMemoryDbContext>((serviceProvider, options) =>
                {
                    options.UseSqlServer(configuration["ConnectionString"],
                        sqlServerOptionsAction: sqlOptions =>
                        {
                            sqlOptions.MigrationsAssembly(typeof(Program).GetTypeInfo().Assembly.GetName().Name);
                        });
                    options.UseInternalServiceProvider(serviceProvider);
                    // Changing default behavior when client evaluation occurs to throw. 
                    // Default in EF Core would be to log a warning when client evaluation is performed.
                    // RelationalEventId.QueryPossibleUnintendedUseOfEqualsWarning == CoreEventId.RelationalBaseId + 500
                    options.ConfigureWarnings(warnings => warnings.Throw(CoreEventId.RelationalBaseId + 500));
                    //Check Client vs. Server evaluation: https://docs.microsoft.com/en-us/ef/core/querying/client-eval
                });
        }
        else
        {
            services.AddDbContext<IDatabaseContext, NotaloneDatabaseInMemoryDbContext>(options =>
            {
                options.UseInMemoryDatabase("Users");
                options.UseInMemoryDatabase("Projects");
            });
        }

        return services;
    }
}