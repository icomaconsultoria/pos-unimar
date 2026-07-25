import { TaskRepository } from '../../domain/repositories/TaskRepository';
import { Task, ChecklistItem } from '../../domain/entities/Tasks';
import { db } from '../config/firebase';

export class FirestoreTaskRepository implements TaskRepository {
  private collection = db.collection('tasks');

  async findById(id: string): Promise<Task | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;

    return this.mapToTask(doc.id, doc.data());
  }
  async findByAssignedId(assigneeId: string): Promise<Task[]> {
    const snapshot = await this.collection.where('assigneeId', '==', assigneeId).get();
    return snapshot.docs.map(doc => this.mapToTask(doc.id, doc.data()));
  }
  async findByCreatorId(creatorId: string): Promise<Task[]> {
    const snapshot = await this.collection.where('creatorId', '==', creatorId).get();
    return snapshot.docs.map(doc => this.mapToTask(doc.id, doc.data()));
  }
  async save(task: Task): Promise<void> {
    await this.collection.doc(task.id).set({
      title: task.title,
      date: task.date,
      checklist: task.checklist,
      creatorId: task.creatorId,
      assigneeId: task.assignedId,
      createdAt: task.createdAt,
      completedAt: task.completedAt || null
    });
  }
  private mapToTask(id: string, data: any): Task {
    const date = data.date ? data.date.toDate() : new Date();
    const createdAt = data.createdAt ? data.createdAt.toDate() : new Date();
    const completedAt = data.completedAt ? data.completedAt.toDate() : null;

    return new Task(
      id,
      data.title,
      date,
      data.checklist || [],
      data.creatorId,
      data.assigneeId,
      createdAt,
      completedAt
    );
  }
}
