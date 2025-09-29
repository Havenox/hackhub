# HackHub Frontend

Frontend do **HackHub**, uma plataforma para gerenciamento de hackathons.
Construído com **Vite + React + TypeScript**, utilizando **shadcn/ui** e **TailwindCSS**.

---

## 🚀 Como rodar em desenvolvimento

1. Clone o repositório:

   ```bash
   git clone https://github.com/Havenox/hackhub.git
    ```
   ```
   cd hackhub/frontend
   ```

2. Instale as dependências:

   ```bash
   npm i
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo **.env.development** na pasta `frontend/` (baseado em `.env.production.example`):

   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

   > Esse é o endereço da API quando você roda o backend localmente (`dotnet run` no projeto `backend/Api`).

4. Rode o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   O frontend estará disponível em [http://localhost:8080](http://localhost:8080).
   Certifique-se que o **backend** também esteja rodando localmente para evitar erros de CORS/autenticação.

---

## 🏗️ Como buildar para produção

1. Configure as variáveis de ambiente em um arquivo **.env.production** na pasta `frontend/`:

   ```env
   VITE_API_BASE_URL=https://ENDERECO_PRODUCAO_API
   ```

   > Esse deve ser o endpoint público da API, já configurado no servidor.

2. Gere os arquivos estáticos:

   ```bash
   npm run build
   ```

   Os arquivos gerados estarão dentro da pasta `dist/`.

3. Para testar o build localmente:

   ```bash
   npm run preview
   ```

---

## 📦 Deploy com Docker + Nginx

Os arquivos: **docker-compose.yml** e **nginx.conf** já estão configurados para servir a pasta `dist/` na porta 80. 

Caso queira servir em uma porta diferente troque a porta de entrada no container no docker-compose.yml.

* **Importante**: A pasta `dist/` com o front buildado precisa estar na mesma pasta do docker-compose.yml e do nginx.conf.

Rode esse comando na pasta:
   ```bash
   docker compose up -d
   ```



> Para automatizar esse processo, recomendo usar **GitHub Actions** ou **Git hooks** que façam build + deploy ao dar push na branch principal.

---

## 🔑 Variáveis de ambiente

| Variável            | Descrição                              | Exemplo                                                                     |
| ------------------- | -------------------------------------- | --------------------------------------------------------------------------- |
| `VITE_API_BASE_URL` | URL base da API (backend ASP.NET Core) | `http://localhost:5000` (dev) / `https://ENDERECO_PRODUCAO_API` (prod) |
