# GranHackathon Backend (.NET 8 + EF Core + MariaDB)

## Requisitos
- .NET SDK 8
- MariaDB 10.6+

## Configuração
1. Criar base de dados e usuário no MariaDB.
2. Definir variável de ambiente `MARIADB_CONNECTION_STRING` (opcional). Caso não defina, será usado o appsettings.json (localhost).
3. Definir variáveis JWT (opcional): `JWT__ISSUER`, `JWT__AUDIENCE`, `JWT__KEY`.

## Estrutura
- Api/
  - Program.cs
  - appsettings.json
  - Domain/ (entidades)
  - Infrastructure/ (AppDbContext)
  - DTOs/
  - Services/ (hash e JWT)
  - Controllers/ (Auth, Hackathons, Marketplace, Enrollments, Teams, Applications, Announcements)

## Execução local
```bash
cd backend/Api
# aplicar migrations (crie as migrations com dotnet-ef se necessário)
# dotnet tool install --global dotnet-ef
# dotnet ef migrations add InitialCreate
# dotnet ef database update

dotnet run
```

Swagger: http://localhost:5000/swagger (ou porta informada pelo ASP.NET)

## Fluxos implementados (MVP)
- Autenticação (registro/login) com JWT.
- CRUD de Hackathons (apenas organizador/admin).
- Marketplace de hackathons públicos.
- Inscrição do usuário em hackathon.
- Times: criar time (inscrito), adicionar vagas.
- Candidaturas em times; aceite/recusa pelo dono do time.
- Comunicados do organizador por hackathon.

## Observações
- Regra "usuário não pode estar em mais de um grupo no mesmo evento" está garantida no MVP considerando o usuário como dono do time. Evoluir para associação explícita de membros.
- Para produção, mantenha `Jwt:Key` seguro e configure HTTPS reverso / CORS conforme o frontend.