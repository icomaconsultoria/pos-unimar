import { Task } from "../../domain/entities/Tasks"
import { TaskRepository } from "../../domain/repositories/TaskRepository"

export class GetTasksByUsersUseCase{
    constructor(private readonly taskRepository: TaskRepository){}

    public async execute(email: string): Promise<Task[]>{
        const assinedTasks = await this.taskRepository.findByAssignedId(email)
        const createdTasks = await this.taskRepository.findByCreatorId(email)
        const allTasks = [...assinedTasks, ...createdTasks];
        const uniqueTasks = Array.from(new Map(allTasks.map(task => [task.id, task])).values())

        return uniqueTasks
    }
}
