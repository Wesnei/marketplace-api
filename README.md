# Marketplace API

Uma API RESTful desenvolvida com NestJS para um sistema de marketplace com funcionalidades de usuários, produtos e carrinho de compras.

## 🚀 Tecnologias Utilizadas

- **NestJS** - Framework Node.js para aplicações server-side
- **Prisma** - ORM moderno para TypeScript e Node.js
- **PostgreSQL** - Banco de dados relacional
- **Docker** - Containerização da aplicação
- **JWT** - Autenticação e autorização
- **Swagger** - Documentação da API
- **TypeScript** - Linguagem de programação

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

## 🛠️ Instalação e Configuração

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd marketplace
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Database
DATABASE_URL="postgresql://postgres:docker@localhost:5432/marketplace_db"

# JWT
JWT_SECRET="seu-jwt-secret-aqui"
JWT_EXPIRES_IN="7d"

# Application
PORT=3000
NODE_ENV="development"
BASE_URL="http://localhost:3000"

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 4. Inicie o banco de dados com Docker

```bash
docker-compose up -d
```

Este comando irá:
- Criar um container PostgreSQL na porta 5432
- Configurar o banco de dados `marketplace_db`
- Criar um usuário `postgres` com senha `docker`

### 5. Execute as migrações do Prisma

```bash
npx prisma migrate dev
```

### 6. (Opcional) Execute o seed para dados iniciais

```bash
npx prisma db seed
```

## 🚀 Como Executar o Projeto

### Modo de Desenvolvimento

```bash
npm run start:dev
```

O servidor será iniciado em modo de desenvolvimento com hot-reload ativo.

### Modo de Produção

```bash
# Primeiro, construa o projeto
npm run build

# Depois, inicie em modo de produção
npm run start
```

### Outros Comandos Disponíveis

## 📊 Banco de Dados

### Comandos do Prisma

```bash
# Visualizar o banco de dados no Prisma Studio
npx prisma studio

# Resetar o banco de dados
npx prisma migrate reset

# Gerar o cliente Prisma
npx prisma generate

# Aplicar migrações pendentes
npx prisma migrate deploy
```

### Estrutura do Banco

O projeto utiliza as seguintes tabelas principais:
- **users** - Usuários do sistema (ADMIN/USER)
- **products** - Produtos do marketplace
- **carts** - Carrinhos de compra dos usuários
- **product_in_carts** - Relação entre produtos e carrinhos

## 📚 Documentação da API

Após iniciar o servidor, a documentação interativa da API estará disponível em:

```
http://localhost:3000/api/v1/docs
```

## 🐳 Docker

### Parar os serviços

```bash
docker-compose down
```
### Porta já em uso

Se a porta 3000 estiver em uso, altere a variável `PORT` no arquivo `.env` ou pare o processo que está usando a porta.

## 📝 Estrutura do Projeto

```
marketplace/
├── src/                 # Código fonte da aplicação
├── prisma/             # Schema e migrações do banco
├── dist/               # Código compilado
├── uploads/            # Arquivos enviados
├── docker-compose.yml  # Configuração do Docker
├── package.json        # Dependências e scripts
└── README.md          # Este arquivo
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `package.json` para mais detalhes e informações.
