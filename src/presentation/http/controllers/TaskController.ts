import { Request, Response } from "express"
import { CreateTaskUseCase } from "../../../application/use-cases/CreateTaskUseCase"

export class TaskController {
    constructor(private createTaskUseCase: CreateTaskUseCase) { }

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
                res.status(500).json({ error:'Internal server error'})
            }
        }
    }
}