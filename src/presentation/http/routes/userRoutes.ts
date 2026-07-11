import {Router} from 'express'
import { UserController } from '../controllers/UserController'
import { FirestoreUserRepository } from '../../../infrastructure/repositories/FirestoreUserRepository'
import { CreateUserUseCase } from '../../../application/use-cases/CreateUserUseCase'
import { FirebaseAuthService } from '../../../infrastructure/service/FirebaseAuthService'

const router = Router()

const userRepository = new FirestoreUserRepository()
const authService = new FirebaseAuthService()
const createUserUseCase = new CreateUserUseCase(userRepository, authService)
const userController = new UserController(createUserUseCase)


router.post('/', (req, res) => userController.createUser(req, res))

export { router as userRoutes }