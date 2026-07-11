"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    createUserUseCase;
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    async createUser(req, res) {
        try {
            const { id, email, displayName } = req.body;
            const user = await this.createUserUseCase.execute({ id, email, displayName });
            res.status(201).json(user);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
exports.UserController = UserController;
