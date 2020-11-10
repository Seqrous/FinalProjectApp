FROM mcr.microsoft.com/dotnet/sdk:3.0 AS build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.sln .
COPY API/*.csproj ./API/
RUN dotnet restore

# copy everything else and build app
COPY API/. ./API/
WORKDIR /app/API
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:3.0 AS runtime
WORKDIR /app
COPY --from=build /app/API/out ./
ENTRYPOINT ["dotnet", "API.dll"]