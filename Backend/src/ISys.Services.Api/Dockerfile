FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["ISys.Services.Api/ISys.Services.Api.csproj", "ISys.Services.Api/"]
RUN dotnet restore "ISys.Services.Api/ISys.Services.Api.csproj"
COPY . .
WORKDIR "/src/ISys.Services.Api"
RUN dotnet build "ISys.Services.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ISys.Services.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ISys.Services.Api.dll"]