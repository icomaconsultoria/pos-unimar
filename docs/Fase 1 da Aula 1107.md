### 1. Domain Layer (`src/domain/`)
The core of our business logic.
- **Entity**: [User](file:///d:/ddd-unimar/src/domain/entities/User.ts) represents the core business model.
- **Repository Interface**: [UserRepository](file:///d:/ddd-unimar/src/domain/repositories/UserRepository.ts) defines the contract for data access. It does not depend on Firebase, which makes the domain independent of external frameworks.

### 2. Application Layer (`src/application/`)
Contains specific use cases of the application.
- **Use Case**: [CreateUserUseCase](file:///d:/ddd-unimar/src/application/use-cases/CreateUserUseCase.ts) handles the logic to create a new user. It expects a generic `UserRepository` via constructor injection (Dependency Injection), validating the user before saving.
- **DTO**: [CreateUserDTO](file:///d:/ddd-unimar/src/application/dtos/CreateUserDTO.ts) structures the incoming data.

### 3. Infrastructure Layer (`src/infrastructure/`)
Implementations of external frameworks (Firebase in our case).
- **Config**: [firebase.ts](file:///d:/ddd-unimar/src/infrastructure/config/firebase.ts) initializes the `firebase-admin` SDK, pointing directly to the local emulator (`localhost:8080` for Firestore and `9099` for Auth).
- **Repository**: [FirestoreUserRepository](file:///d:/ddd-unimar/src/infrastructure/repositories/FirestoreUserRepository.ts) is the concrete implementation of the `UserRepository` interface. It handles reading/writing directly to Firestore.

### 4. Presentation Layer (`src/presentation/`)
The entry point from the web.
- **Controller**: [UserController](file:///d:/ddd-unimar/src/presentation/http/controllers/UserController.ts) receives HTTP requests, calls the use case, and responds.
- **Routes & Server**: [server.ts](file:///d:/ddd-unimar/src/presentation/http/server.ts) and [userRoutes.ts](file:///d:/ddd-unimar/src/presentation/http/routes/userRoutes.ts) handle Express configuration and dependency wiring (injecting `FirestoreUserRepository` into `CreateUserUseCase`, and then into `UserController`).

## Environment Configuration
The `.env` file was created with the Firebase Web keys provided. However, since this is a backend running `firebase-admin`, we usually use a service account key or the local emulator suite. I have configured `firebase.json` and the code to automatically use the Emulator Suite if you start it.

## Testing Your Code Locally

1. **Install Firebase Tools (if you don't have them globally)**:
```bash
npm install -g firebase-tools
```

2. **Start the Firebase Emulators**:
```bash
firebase emulators:start
```

3. **In a different terminal, start your backend server**:
```bash
npm run dev
```

4. **Test the Endpoint**:
Send a POST request to `http://localhost:3000/users`:
```json
{
  "id": "user-123",
  "email": "test@example.com",
  "displayName": "Victor"
}
```
