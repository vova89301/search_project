using Notalone.API.Extensions;
using Notalone.API.HealthChecks;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersAndAuth();
builder.Services.AddServices();
builder.Services.AddCustomSwagger();
builder.Services.AddDatabase(builder.Configuration);

var app = builder.Build();
app.UseCustomSwagger();
app.UseCustomExceptionHandler();
app.BuildApp();

// Mark service as Ready and Healthy
var readinessProbe = app.Services.GetRequiredService<ReadinessHealthCheck>();
readinessProbe.MarkReady();

app.Run();