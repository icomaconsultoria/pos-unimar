"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTasksByUsersUseCase = void 0;
class GetTasksByUsersUseCase {
    taskRepository;
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(email) {
        const assinedTasks = await this.taskRepository.findByAssignedId(email);
        const createdTasks = await this.taskRepository.findByCreatorId(email);
        const allTasks = [...assinedTasks, ...createdTasks];
        const uniqueTasks = Array.from(new Map(allTasks.map(task => [task.id, task])).values());
        return uniqueTasks;
    }
}
exports.GetTasksByUsersUseCase = GetTasksByUsersUseCase;
