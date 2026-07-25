import { Task } from '../entities/Tasks'

export interface TaskRepository{
    findById(id: string): Promise<Task | null>
    findByAssignedId(assignedId: string): Promise<Task[]>
    findByCreatorId(creatorId: string): Promise<Task[]>
    save(task:Task): Promise<void>
}