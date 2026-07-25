import { Task } from "../../domain/entities/Tasks"
import { TaskRepository } from "../../domain/repositories/TaskRepository"

export class GetCreatedTasksByUsersUseCase {
   constructor(private readonly taskRepository: TaskRepository) {}

   public async execute(email: string): Promise<Task[]> {
      const createdTasks = await this.taskRepository.findByCreatorId(email)

      return createdTasks
   }
}