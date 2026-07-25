"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    id;
    title;
    date;
    checklist;
    creatorId;
    assignedId;
    createdAt;
    completedAt;
    constructor(id, title, date, checklist, creatorId, assignedId, createdAt, completedAt) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.checklist = checklist;
        this.creatorId = creatorId;
        this.assignedId = assignedId;
        this.createdAt = createdAt;
        this.completedAt = completedAt;
    }
    markAsCompleted() {
        this.completedAt = new Date();
    }
    markAsIncomplete() {
        this.completedAt = null;
    }
    updateChecklistItem(itemId, isCompleted) {
        const item = this.checklist.find(i => i.id === itemId);
        if (item) {
            item.isCompleted = isCompleted;
        }
    }
}
exports.Task = Task;
