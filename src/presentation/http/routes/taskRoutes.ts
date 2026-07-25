import { Router } from "express"
import { TaskController } from "../controllers/TaskController"
import { FirestoreTaskRepository } from "../../../infrastructure/repositories/FirestoreTaskRepository"
import { CreateTaskUseCase } from "../../../application/use-cases/CreateTaskUseCase"
import { GetTasksByUsersUseCase } from "../../../application/use-cases/GetTasksByUsersUseCase"

const router = Router()

const taskRepository = new FirestoreTaskRepository()
const createTaskUseCase = new CreateTaskUseCase(taskRepository)
const getTasksByUsersUseCase = new GetTasksByUsersUseCase(taskRepository)
const taskController = new TaskController(createTaskUseCase, getTasksByUsersUseCase)

router.post('/', (req, res) => taskController.createTask(req, res))
router.get('/user/:email',(req, res) => taskController.getTasksByUserEmail(req, res))

export {router as taskRouter}