import { Request, Response } from "express"
import { CreateTaskUseCase } from "../../../application/use-cases/CreateTaskUseCase"
import { GetTasksByUsersUseCase } from "../../../application/use-cases/GetTasksByUsersUseCase"
import { GetCreatedTasksByUsersUseCase } from "../../../application/use-cases/GetCreatedTasksByUsersUseCase"

export class TaskController {
    constructor(
        private createTaskUseCase: CreateTaskUseCase,
        private getTasksByUserUseCase: GetTasksByUsersUseCase,
        private getCreatedTasksByUserUseCase: GetCreatedTasksByUsersUseCase
    ) { }

    async createTask(req: Request, res: Response): Promise<void> {
        try {
            const {
                id,
                title,
                date,
                checklist,
                creatorId,
                assignedId
            } = req.body
            const task = await this.createTaskUseCase.execute({
                id,
                title,
                date,
                checklist,
                creatorId,
                assignedId
            })
            res.status(201).json(task)
        } catch (error: any) {
            if (error.message === 'Task already exists') {
                res.status(409).json({ error: error.message })
            } else {
                console.error(error)
                res.status(500).json({ error: 'Internal server error' })
            }
        }
    }

    async getTasksByUserEmail(req: Request, res: Response): Promise<void> {
        try {
            const email = req.params.email as string
            if (!email) {
                res.status(409).json({ error: "Error parameter requirer." })
                return
            }

            const tasks = await this.getTasksByUserUseCase.execute(email)
            res.status(200).json(tasks)
        } catch (error: any) {
            console.error(error)
            res.status(500).json({ error: "Internal server error!" })
        }
    }

    async getCreatedTasksByUserEmail(req: Request, res: Response): Promise<void> {
        try {
            const email = req.params.email as string
            if (!email) {
                res.status(409).json({ error: "Error parameter requirer." })
                return
            }

            const tasks = await this.getCreatedTasksByUserUseCase.execute(email)
            res.status(200).json(tasks)
        } catch (error: any) {
            console.error(error)
            res.status(500).json({ error: "Internal server error!" })
        }
    }
}