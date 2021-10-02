FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY  /published ./
ENTRYPOINT ["dotnet", "DiFe.dll"]