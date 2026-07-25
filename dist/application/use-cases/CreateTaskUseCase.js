"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskUseCase = void 0;
const Tasks_1 = require("../../domain/entities/Tasks");
class CreateTaskUseCase {
    taskRepository;
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(dto) {
        if (dto.id) {
            const existingTask = await this.taskRepository.findById(dto.id);
            if (existingTask) {
                throw new Error('Task already exists');
            }
        }
        const taskId = dto.id || this.generateId();
        const targetDate = new Date(dto.date);
        const checklist = (dto.checklist || []).map(item => ({
            id: item.id || this.generateId(),
            description: item.description,
            isCompleted: item.isCompleted || false
        }));
        const task = new Tasks_1.Task(taskId, dto.title, targetDate, checklist, dto.creatorId, dto.assignedId, new Date(), null);
        await this.taskRepository.save(task);
        return task;
    }
    generateId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}
exports.CreateTaskUseCase = CreateTaskUseCase;
