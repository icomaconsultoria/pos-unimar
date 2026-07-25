"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
class TaskController {
    createTaskUseCase;
    getTasksByUsersUseCase;
    constructor(createTaskUseCase, getTasksByUsersUseCase) {
        this.createTaskUseCase = createTaskUseCase;
        this.getTasksByUsersUseCase = getTasksByUsersUseCase;
    }
    async createTask(req, res) {
        try {
            const { id, title, date, checklist, creatorId, assignedId } = req.body;
            const task = await this.createTaskUseCase.execute({
                id,
                title,
                date,
                checklist,
                creatorId,
                assignedId
            });
            res.status(201).json(task);
        }
        catch (error) {
            if (error.message === 'Task already exists') {
                res.status(409).json({ error: error.message });
            }
            else {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    async getTasksByUserEmail(req, res) {
        try {
            const email = req.params.email;
            if (!email) {
                res.status(409).json({ error: "Error parameter requirer" });
                return;
            }
            const tasks = await this.getTasksByUsersUseCase.execute(email);
            res.status(200).json(tasks);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.TaskController = TaskController;
