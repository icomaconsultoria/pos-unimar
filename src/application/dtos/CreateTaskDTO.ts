import { ChecklistItem } from "../../domain/entities/Tasks"

export interface CreateTaskDTO {
    id?: string;
    title: string;
    date: Date;
    checklist?: {id?: string, description: string, isCompleted: boolean}[];
    creatorId: string;
    assignedId: string;
}