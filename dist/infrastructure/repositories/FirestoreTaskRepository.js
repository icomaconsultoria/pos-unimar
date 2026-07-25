"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreTaskRepository = void 0;
const Tasks_1 = require("../../domain/entities/Tasks");
const firebase_1 = require("../config/firebase");
class FirestoreTaskRepository {
    collection = firebase_1.db.collection('tasks');
    async findById(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists)
            return null;
        return this.mapToTask(doc.id, doc.data());
    }
    async findByAssignedId(assigneeId) {
        const snapshot = await this.collection.where('assigneeId', '==', assigneeId).get();
        return snapshot.docs.map(doc => this.mapToTask(doc.id, doc.data()));
    }
    async findByCreatorId(creatorId) {
        const snapshot = await this.collection.where('creatorId', '==', creatorId).get();
        return snapshot.docs.map(doc => this.mapToTask(doc.id, doc.data()));
    }
    async save(task) {
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
    mapToTask(id, data) {
        const date = data.date ? data.date.toDate() : new Date();
        const createdAt = data.createdAt ? data.createdAt.toDate() : new Date();
        const completedAt = data.completedAt ? data.completedAt.toDate() : null;
        return new Tasks_1.Task(id, data.title, date, data.checklist || [], data.creatorId, data.assigneeId, createdAt, completedAt);
    }
}
exports.FirestoreTaskRepository = FirestoreTaskRepository;
