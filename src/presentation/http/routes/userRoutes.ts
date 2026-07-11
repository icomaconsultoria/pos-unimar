import {Router} from 'express'
import { UserController } from '../controllers/UserController'
import { FirestoreUserRepository } from '../../../infrastructure/repositories/FirestoreUserRepository'
import { CreateUserUseCase } from '../../../application/use-cases/CreateUserUseCase'

const router = Router()

const userRepository = new FirestoreUserRepository()
const createUserUseCase = new CreateUserUseCase(userRepository)
const userController = new UserController(createUserUseCase)

router.post('/', (req, res) => userController.createUser(req, res))

export { router as userRoutes }