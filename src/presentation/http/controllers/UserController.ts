import { Request, Response } from "express"
import { CreateUserUseCase } from "../../../application/use-cases/CreateUserUseCase"

export class UserController {
    constructor(private createUserUseCase: CreateUserUseCase) { }
    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { id, email, displayName } = req.body
            const user = await this.createUserUseCase.execute({ id, email, displayName })
            res.status(201).json(user)
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}
