# BankMe Backend

Backend do desafio técnico da aplicação AproveMe, desenvolvido com NestJS para gerenciamento de recebíveis.

## 🚀 Tecnologias

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/)
- [Jest](https://jestjs.io/)

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório
```bash
git clone https://github.com/JdsLima/aprove-me.git
cd aprove-me/backend
```

2. Instale as dependências
```bash
yarn install
```

## ⚙️ Configuração do Banco de Dados

1. O banco SQLite será criado automaticamente na primeira execução. Se preferir, configure a URL do banco no arquivo `.env`:
```env
DATABASE_URL="file:./dev.db"
```

2. Execute as migrations do Prisma
```bash
# Gera as migrations baseadas no schema
yarn prisma migrate dev

# Aplica as migrations
yarn prisma migrate deploy
```

3. (Opcional) Visualize seus dados com Prisma Studio
```bash
yarn prisma studio
```

## 🏃‍♂️ Executando a aplicação

```bash
# desenvolvimento
yarn run start

# modo watch
yarn run start:dev

# produção
yarn run start:prod
```

## 🧪 Testes

```bash
# testes unitários
yarn run test
```

## 🛣️ Principais Endpoints

### Cedentes
- `POST /assignor` - Criar novo cedente
- `GET /assignor` - Listar cedentes
- `GET /assignor/:id` - Buscar cedente por ID
- `PATCH /assignor/:id` - Atualizar cedente
- `DELETE /assignor/:id` - Remover cedente

### Pagáveis
- `POST /payable` - Registrar novo pagável
- `GET /payable` - Listar pagáveis
- `GET /payable/:id` - Buscar pagável por ID
- `PATCH /payable/:id` - Atualizar pagável
- `DELETE /payable/:id` - Remover pagável

## 📦 Scripts Disponíveis

- `yarn build` - Compila o projeto
- `yarn format` - Formata o código usando Prettier
- `yarn lint` - Executa o linter
- `yarn prisma generate` - Gera o cliente Prisma
- `yarn prisma migrate dev` - Gera e aplica migrations (desenvolvimento)
- `yarn prisma migrate deploy` - Aplica migrations (produção)
- `yarn prisma studio` - Abre interface visual do Prisma


## 🗄️ Modelo do Banco de Dados

```prisma
model Assignor {
  id       String     @id @default(uuid())
  document String     @unique
  email    String     @unique
  phone    String     @unique
  name     String
  Payables Payable[]
}

model Payable {
  id           String   @id @default(uuid())
  value        Float
  emissionDate DateTime
  assignorId   String
  assignor     Assignor @relation(fields: [assignorId], references: [id])
}
```

## 🐳 Docker

### Pré-requisitos para Docker
- Docker
- Docker Compose

### Instalação com Docker

1. Clone o repositório
```bash
git clone https://github.com/JdsLima/aprove-me.git
cd aprove-me/backend
```

2. Configure o arquivo .env
```env
DATABASE_URL="file:/app/prisma/dev.db"
```

3. Construa e inicie os containers
```bash
# Construir a imagem
yarn docker:build

# Iniciar os containers
yarn docker:up

# Parar os containers
yarn docker:down
```

### Comandos Docker Úteis

```bash
# Ver logs do container
docker-compose logs -f api

# Executar migrations
docker-compose exec api yarn prisma migrate dev

# Abrir Prisma Studio
docker-compose exec api yarn prisma studio

# Acessar o shell do container
docker-compose exec api sh

# Ver status dos containers
docker-compose ps
```

### Estrutura Docker

O projeto utiliza dois arquivos principais para Docker:

1. `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
RUN npm install -g yarn
COPY package.json yarn.lock ./
COPY prisma ./prisma/
RUN yarn install
RUN yarn prisma generate
COPY . .
EXPOSE 3000
CMD ["yarn", "dev"]
```

2. `docker-compose.yml`:
```yaml
version: '3.8'
services:
  api:
    build: .
    container_name: api
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=file:/app/prisma/dev.db
    volumes:
      - .:/app
      - /app/node_modules
    # Adicione healthcheck para garantir que o serviço está rodando
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```
