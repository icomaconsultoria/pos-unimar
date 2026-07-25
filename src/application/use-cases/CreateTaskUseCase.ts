import { Task, ChecklistItem } from '../../domain/entities/Tasks';
import { TaskRepository } from '../../domain/repositories/TaskRepository';
import { CreateTaskDTO } from '../dtos/CreateTaskDTO';
export class CreateTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository) { }

    public async execute(dto: CreateTaskDTO): Promise<Task> {
        if (dto.id) {
            const existingTask = await this.taskRepository.findById(dto.id);
            if (existingTask) {
                throw new Error('Task already exists');
            }
        }

        const taskId = dto.id || this.generateId();
        const targetDate = new Date(dto.date);

        const checklist: ChecklistItem[] = (dto.checklist || []).map(item => ({
            id: item.id || this.generateId(),
            description: item.description,
            isCompleted: item.isCompleted || false
        }));

        const task = new Task(
            taskId,
            dto.title,
            targetDate,
            checklist,
            dto.creatorId,
            dto.assignedId,
            new Date(),
            null
        );

        await this.taskRepository.save(task);

        return task;
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}
