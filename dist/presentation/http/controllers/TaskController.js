"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
class TaskController {
    createTaskUseCase;
    constructor(createTaskUseCase) {
        this.createTaskUseCase = createTaskUseCase;
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
}
exports.TaskController = TaskController;
