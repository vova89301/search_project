FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Notalone.API/Notalone.API.csproj", "Notalone.API/"]
RUN dotnet restore "Notalone.API/Notalone.API.csproj"
COPY . .
WORKDIR "/src/Notalone.API"
RUN dotnet build "Notalone.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Notalone.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Notalone.API.dll"]
