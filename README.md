<h1 align="center"> NLW Expert </h1>

## 💻 Projeto

App de enquetes com comunicação em tempo real usando WebSockets produzido na aula de NLW Expert disponibilizada pela [Rocketseat](https://encurtador.com.br/cgnsB). Possui as seguintes funcionalidades:
- Criar uma nova enquete
- Obter informações de uma enquete
- Votar em uma opção da enquete
- Visualizar em tempo real as votações

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- NodeJS
- Typescript
- Docker (para lidar com serviços de PostgreSQL e Redis)
- Zod
- Prisma
- Fastify
- WebSocket

## 🕹️ Executar

### Instalar as dependências:
```bash
npm install -y
```
### Docker:
- [Instale o Docker](https://www.docker.com/get-started)
- Use: `docker-compose up -d` para subir os containers do Postgres e do Redis
- Use: `docker ps` na raiz do projeto para verificar se os serviços estão em execução.

### Rotas
- GET - `/polls/:pollId` : Captura dados de uma enquete pelo ID: `pollId`
- POST - `polls` : Cria uma enquete enviando o título e as opções da enquete no corpo da requisição em formato JSON. * Retorna o ID da enquente criada.
Exemplo:
```json
{
    "title": "Teste",
    "options": [
        "Opção 1",
        "Opção 2"
    ]
}
```
- POST - `/polls/:pollId/votes` : Cria um voto em uma opção da enquete especificada (`pollId`) com o ID no corpo da requisição no formato JSON:
```json
{
  "pollOptionId": "e2121405-e75f-48f4-baa3-1cd4c4b274e8"
}
```
*É possivel capturar o ID da opção da enquete com o método GET (primeira rota)
- GET - `/polls/:pollId/results`: Visualiza as votações em tempo real especificando a enquete (`pollID`).

---
###### Feito com ♥ by Rocketseat
