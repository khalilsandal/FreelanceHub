FROM mcr.microsoft.com/dotnet/sdk:8.0

WORKDIR /app

COPY FreelanceHub.Api/FreelanceHub.Api.csproj ./FreelanceHub.Api/

RUN dotnet restore ./FreelanceHub.Api/FreelanceHub.Api.csproj

COPY . .

WORKDIR /app/FreelanceHub.Api

EXPOSE 8080

CMD ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:8080"]