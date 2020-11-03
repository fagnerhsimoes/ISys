Projeto ISys
=====================
O Projeto ISys é um projeto de teste escrito em .NET Core(Backend) e Javascript/React(Frontend)

O objetivo deste projeto é implementar as tecnologias mais utilizadas e aplicar técnicas para melhor forma de desenvolver aplicações com .NET

## Instruções para usar - Opção 1:
 - Você precisará do Docker e docker-compose instalado na maquina.
     
- ### Para criar os Containers de Banco de Dados, Backend e Frontend:
 - #### Com o Docker em execução.
    * Em qualquer terminal de sua preferência, acessar a pasta Raiz dos Projetos: "ISys".
    * Executar os seguintes comandos, onde será definido como será criado as imagens dos containers:
     - * ```docker-compose build```
    * Em seguida, executar o seguinte comando:
     - * ```docker-compose up -d```
    * Após estes passos, estarão criados os containers onde estarão rodando o banco de dados, Backend e Frontend.
    
- ### Executando a Aplicação Backend:
  - Você poderá testar o Backend através de programas como insominia, postman e outros através da url: http://localhost:8000/api.
- ### Executando a Aplicação Frontend:
  - Você poderá testar o fronend através do seu navegador com a seguinte url: http://localhost:3000.


## Instruções para usar - Opção 2:
 - Você precisará do Visual Studio 2019 e do .NET Core SDK mais recentes.
 - O SDK e as ferramentas mais recentes podem ser baixados em [https://dot.net/core](https://dotnet.microsoft.com/download).
- ### Para criar a Instância do Servidor de Banco de Dados:
 - #### Se você tiver o Docker instalado localmente na máquina pode criar uma instância de servidor nele.
    * Com o Docker em execução, executar o seguinte comando para criar o Banco de Dados:
    * - ```docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=135790@Big' -p 1433:1433 --name=SqlServer -d microsoft/mssql-server-linux```
     * Obs. Criando o servidor localmente não será necessário alterar o caminho do Banco nos arquivos de configuração do projeto.
 - #### Se você preferir usar outro servidor.
    * Alterar a string de conexão nos arquivos de configurações(appsettings.json) nos seguintes projetos:
     - * ISys.Services.Api.
     - * ISys.Infra.Data.
     - * ISys.Infra.CrossCutting.Identity.
     
- ### Para criar o de Banco de Dados:
 - #### No Visual Studio com a solução aberta, abrir o gerenciador de pacotes do nuget.
    * No campo "Default Project", selecionar o projeto "ISys.Infra.CrossCutting.Identity".
    * Executar o seguinte comando:
     - * ```Update-Database -Context ApplicationDbContext```
    * Em seguida, no campo "Default Project", selecionar o projeto "ISys.Infra.Data".
    * Executar os seguintes comandos:
     - * ```Update-Database -Context StoreDbContext```
     - * ```Update-Database -Context EventStoreSQLContext```
    * Após estes passos, o Banco de Dados estará criado e as aplicações poderão ser executadas.

Além disso, você pode executar o Projeto ISys no Visual Studio Code (Windows, Linux ou MacOS).

Para saber mais sobre como configurar seu ambiente, visite o Guia de [download](https://dotnet.microsoft.com/download) do Microsoft .NET

- ### Executando a Aplicação Backend:
  - No visual Studio, com a solução do projeto do Backend aberto, efetuar um Build.
  - No visual Studio, com a solução do projeto do Backend aberto, definir o projeto "ISys.Services.Api" como projeto de inicialização.
  - No Visual Studio, com a solução do projeto do Backend aberto, selecionar para executar na opção de self-host(ISys.Services.Api).
  - Executar o projeto.
- ### Executando a Aplicação Frontend:
  - No programa de Linha de Comando de Preferência ou no VS CODE.
  - Abrir a pasta do projeto "Frontend".
  - Executar o comando "```npm install```" ou se tiver o yarn instalado na máquina, pode executar o "```yarn install```"(Recomendado).
  - Executar o comando "```yarn Start```".

## Tecnologias implementadas:

- ASP.NET Standart 2.1
- ASP.NET Core 3.1 (with .NET Core 3.1)
- ASP.NET WebApi Core with JWT Bearer Authentication
- ASP.NET Identity Core
- Entity Framework Core 3.1
- .NET Core Native DI
- AutoMapper
- FluentValidator
- MediatR
- Swagger UI with JWT support

## Arquitetura:

- Arquitetura completa com questões de separação de responsabilidades, Código SÓLIDO e Limpo
- Design baseado em domínio (camadas e padrão de modelo de domínio)
- Eventos de Domínio
- Notificação de Domínio
- Validações de Domínio
- CQRS (Consistência Imediata)
- Event Sourcing
- Unit of Work
- Repository

