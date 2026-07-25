import { Router } from "express"
import { TaskController } from "../controllers/TaskController"
import { FirestoreTaskRepository } from "../../../infrastructure/repositories/FirestoreTaskRepository"
import { CreateTaskUseCase } from "../../../application/use-cases/CreateTaskUseCase"
import { GetTasksByUsersUseCase } from "../../../application/use-cases/GetTasksByUsersUseCase"
import { GetCreatedTasksByUsersUseCase } from "../../../application/use-cases/GetCreatedTasksByUsersUseCase"

const router = Router()

const taskRepository = new FirestoreTaskRepository()
const createTaskUseCase = new CreateTaskUseCase(taskRepository)
const getTasksByUsersUseCase = new GetTasksByUsersUseCase(taskRepository)
const getCreatedTasksByUsersUseCase = new GetCreatedTasksByUsersUseCase(taskRepository)
const taskController = new TaskController(createTaskUseCase, getTasksByUsersUseCase, getCreatedTasksByUsersUseCase)

router.post('/', (req, res) => taskController.createTask(req, res))
router.get('/user/:email', (req, res) => taskController.getTasksByUserEmail(req, res))
router.get('/user/:email/created', (req, res) => taskController.getCreatedTasksByUserEmail(req, res))

export { router as taskRouter }