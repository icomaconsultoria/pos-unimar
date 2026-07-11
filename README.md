# Projeto DDD Unimar - API de Gerenciamento de Usuários

Este projeto é uma API backend desenvolvida em **Node.js** com **TypeScript**, utilizando o banco de dados **Firebase Firestore**. A arquitetura do projeto foi desenhada seguindo os princípios de **Domain-Driven Design (DDD)** e arquitetura limpa (Clean Architecture), promovendo a separação de responsabilidades e alto desacoplamento.

## 🏗️ Desenho da Arquitetura (Domain-Driven Design)
<img width="1137" height="697" alt="image" src="https://github.com/user-attachments/assets/036fc7d4-3628-4aea-94a3-4f895df962a1" />

<img width="566" height="650" alt="image" src="https://github.com/user-attachments/assets/ee756269-f90b-46f3-9cc5-341995f18978" />


O projeto é dividido em quatro camadas principais, de acordo com o padrão DDD:

1. **Domain (Domínio)**
   - É o coração da aplicação. Contém as regras de negócio puras, sem dependências de frameworks ou tecnologias externas.
   - **`entities/`**: Modelos de negócio, como a entidade `User`.
   - **`repositories/`**: Interfaces (contratos) que definem como os dados devem ser acessados, por exemplo, a interface `UserRepository`.

2. **Application (Aplicação)**
   - Orquestra as operações da aplicação através de casos de uso (Use Cases).
   - **`use-cases/`**: Classes que executam os fluxos da aplicação (e.g., `CreateUserUseCase`), utilizando as entidades do domínio e chamando os repositórios através de injeção de dependência.
   - **`dtos/`**: Objetos de Transferência de Dados, usados para tipar as entradas e saídas dos casos de uso.

3. **Infrastructure (Infraestrutura)**
   - Camada responsável por implementações técnicas específicas, como acesso a banco de dados e integrações externas.
   - **`config/`**: Configurações de conexão, como o arquivo `firebase.ts` que inicializa o Firebase Admin SDK.
   - **`repositories/`**: Implementações concretas dos repositórios definidos no domínio. É aqui que o `FirestoreUserRepository` faz as operações reais (CRUD) utilizando o Firestore.

4. **Presentation (Apresentação)**
   - Ponto de entrada da aplicação, responsável por receber as requisições e devolver as respostas.
   - **`http/`**: Configurações do servidor Express, mapeamento de rotas (`routes/`) e controladores (`controllers/`) que chamam a camada de aplicação.

### Padrões de Projeto Utilizados:
- **Repository Pattern**: Abstrai o acesso aos dados para que o domínio não conheça detalhes do Firestore.
- **Dependency Injection**: Permite injetar as implementações dos repositórios diretamente nos casos de uso, facilitando os testes.

---

## ☁️ Infraestrutura e Tecnologias

### 1. Node.js + Express
- O servidor roda em ambiente Node.js.
- O **Express** é utilizado como framework web para gerenciar as rotas e os middlewares HTTP.
- Toda a aplicação é escrita em **TypeScript**, garantindo tipagem forte, auto-completar inteligente e detecção de erros em tempo de compilação.

### 2. Firebase (Firestore Database)
O banco de dados utilizado é o **Cloud Firestore** provido pelo Firebase, acessado pelo **Firebase Admin SDK** no backend.

**Detalhes da Integração Firebase:**
- **Autenticação Servidor a Servidor**: O `firebase-admin` é inicializado na camada de infraestrutura (`src/infrastructure/config/firebase.ts`), utilizando credenciais de conta de serviço (Service Account) providas por variáveis de ambiente.
- **Armazenamento de Dados (Firestore)**:
  - O repositório `FirestoreUserRepository` realiza chamadas diretas às coleções no banco (e.g., coleção `users`).
  - Cada documento no Firestore corresponde a uma Entidade do domínio.
  - A manipulação de datas e outras tipagens específicas do Firestore é isolada no repositório, garantindo que as camadas de Domínio e Aplicação recebam apenas os tipos primitivos do TypeScript.

---

## 📂 Estrutura de Pastas

```text
src/
├── application/              # Camada de Aplicação
│   ├── dtos/                 # Objetos de Transferência (Data Transfer Objects)
│   └── use-cases/            # Casos de Uso (ex: CreateUserUseCase.ts)
├── domain/                   # Camada de Domínio
│   ├── entities/             # Entidades de negócio (ex: User.ts)
│   └── repositories/         # Interfaces dos repositórios (ex: UserRepository.ts)
├── infrastructure/           # Camada de Infraestrutura
│   ├── config/               # Configurações (ex: firebase.ts)
│   └── repositories/         # Implementações de banco (ex: FirestoreUserRepository.ts)
├── presentation/             # Camada de Apresentação (Entrada/Saída)
│   └── http/
│       ├── controllers/      # Controladores que lidam com Req/Res
│       ├── routes/           # Mapeamento de rotas do Express
│       └── server.ts         # Configuração do Express app
└── index.ts                  # Arquivo principal que inicia o servidor
```

## 🚀 Como Executar o Projeto

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto com as credenciais do seu Firebase.

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse a rota de health check para verificar se a API está no ar:
   ```
   GET http://localhost:3000/health
   ```
