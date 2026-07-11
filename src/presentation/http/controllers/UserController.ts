import { Request, Response } from "express"
import { CreateUserUseCase } from "../../../application/use-cases/CreateUserUseCase"

export class UserController {
    constructor(private createUserUseCase: CreateUserUseCase) { }
    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { id, email, displayName, password } = req.body
            const user = await this.createUserUseCase.execute({ id, email, displayName, password })
            res.status(201).json(user)
        } catch (error: any) {
            if (error.message === "User already exists") {
                res.status(409).json({ message: error.message })
            } else {
                console.error(error)
                res.status(500).json({ message: error.message || "Internal server error" })
            }
        }
    }
}
