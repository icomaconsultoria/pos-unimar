"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreUserRepository = void 0;
const User_1 = require("../../domain/entities/User");
const firebase_1 = require("../config/firebase");
class FirestoreUserRepository {
    collection = firebase_1.db.collection('users');
    async findById(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists)
            return null;
        const data = doc.data();
        const createdAt = data.createdAt ? data.createdAt.toDate() : new Date();
        return new User_1.User(doc.id, data.email, data.displayName, createdAt);
    }
    async findByEmail(email) {
        const snapshot = await this.collection.where('email', '==', email).limit(1).get();
        if (snapshot.empty)
            return null;
        const doc = snapshot.docs[0];
        const data = doc.data();
        const createdAt = data.createdAt ? data.createdAt.toDate() : new Date();
        return new User_1.User(doc.id, data.email, data.displayName, createdAt);
    }
    async save(user) {
        await this.collection.doc(user.id).set({
            email: user.email,
            displayName: user.displayName,
            createdAt: user.createdAt
        });
    }
}
exports.FirestoreUserRepository = FirestoreUserRepository;
