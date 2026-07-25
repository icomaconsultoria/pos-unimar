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
            const { id, email, displayName, password, githubPhotoUrl, photoUrl } = req.body;
            const finalPhotoUrl = photoUrl || githubPhotoUrl || null;
            const user = await this.createUserUseCase.execute({ id, email, displayName, password, photoUrl: finalPhotoUrl });
            res.status(201).json(user);
        }
        catch (error) {
            if (error.message === "User already exists") {
                res.status(409).json({ message: error.message });
            }
            else {
                console.error(error);
                res.status(500).json({ message: error.message || "Internal server error" });
            }
        }
    }
}
exports.UserController = UserController;
