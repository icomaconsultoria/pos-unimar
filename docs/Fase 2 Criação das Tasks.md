# Domínio de Tarefas

O novo domínio para o gerenciamento de **Tarefas** foi implementado com sucesso! A arquitetura segue a mesma organização de código que você já tinha no projeto, respeitando o padrão DDD.

Abaixo está o resumo do que foi construído:

## 1. Domain Layer (Domínio)
- **[Task.ts](file:///d:/ddd-unimar/src/domain/entities/Task.ts)**: A entidade de tarefa conta com `id`, `title`, `date`, `checklist` (com itens que possuem descrição e status), `creatorId`, `assigneeId`, `createdAt` e `completedAt`. Foram adicionados métodos para lidar com alterações de status (`markAsCompleted`, `markAsPending` e `updateChecklistItem`).
- **[TaskRepository.ts](file:///d:/ddd-unimar/src/domain/repositories/TaskRepository.ts)**: A interface possui os contratos essenciais: `findById`, `findByAssignee`, `findByCreator` e `save`.

## 2. Application Layer (Casos de Uso e DTOs)
- **[CreateTaskDTO.ts](file:///d:/ddd-unimar/src/application/dtos/CreateTaskDTO.ts)**: Contém o DTO necessário para criar uma tarefa.
- **[CreateTaskUseCase.ts](file:///d:/ddd-unimar/src/application/use-cases/CreateTaskUseCase.ts)**: O caso de uso processa o DTO, gera o `id` da tarefa (caso não informado), preenche as propriedades de datas, processa o checklist (também adicionando um ID único para cada item do checklist, caso não exista) e salva pelo Repository.

## 3. Infrastructure Layer (Infraestrutura)
- **[FirestoreTaskRepository.ts](file:///d:/ddd-unimar/src/infrastructure/repositories/FirestoreTaskRepository.ts)**: O repositório realiza as operações diretamente no Firebase (na coleção `tasks`). Ele já embute métodos para buscar por `assigneeId` e `creatorId`, os quais servirão para listar as tarefas de cada usuário!

## 4. Presentation Layer (Rotas e Controladores)
- **[TaskController.ts](file:///d:/ddd-unimar/src/presentation/http/controllers/TaskController.ts) e [taskRoutes.ts](file:///d:/ddd-unimar/src/presentation/http/routes/taskRoutes.ts)**: Eles expõem uma rota HTTP `POST /tasks` para criar e processar essas solicitações, extraindo os dados do payload e direcionando para o caso de uso.
- **[server.ts](file:///d:/ddd-unimar/src/presentation/http/server.ts)**: O roteador das tarefas foi conectado no aplicativo Express.

---

## 📌 Sobre os Índices do Firestore (Indexes)

> [!NOTE]
> Como você mencionou: **precisaremos de indexes no Firebase**.

Nos métodos `findByAssignee` e `findByCreator`, realizamos consultas filtrando campos específicos (ex: `where('assigneeId', '==', assigneeId)`). 
Para consultas simples como essas, o Firestore cria um **índice padrão** automaticamente para cada campo. 

No entanto, se você adicionar filtros combinados ou ordenações (por exemplo: buscar tarefas de um `assigneeId` ordenadas por `date`), o Firestore vai falhar na primeira execução e irá retornar um erro no console contendo um **link direto**. Basta clicar no link, e o painel do Firebase automaticamente configurará o índice composto (Composite Index) para você. 
Caso você utilize a [Firebase CLI](https://firebase.google.com/docs/cli), os mesmos poderão ser descritos em seu arquivo `firestore.indexes.json` mais adiante!
