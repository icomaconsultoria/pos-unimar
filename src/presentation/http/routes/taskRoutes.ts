import { Router } from "express"
import { TaskController } from "../controllers/TaskController"
import { FirestoreTaskRepository } from "../../../infrastructure/repositories/FirestoreTaskRepository"
import { CreateTaskUseCase } from "../../../application/use-cases/CreateTaskUseCase"

const router = Router()

const taskRepository = new FirestoreTaskRepository()
const createTaskUseCase = new CreateTaskUseCase(taskRepository)
const taskController = new TaskController(createTaskUseCase)

router.post('/', (req, res) => taskController.createTask(req, res))

export {router as taskRouter}