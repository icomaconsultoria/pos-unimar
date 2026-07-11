import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { db } from '../config/firebase';

export class FirestoreUserRepository implements UserRepository {
  private collection = db.collection('users');

  async findById(id: string): Promise<User | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data() as any;
    const createdAt = data.createdAt ? data.createdAt.toDate() : new Date();
    return new User(doc.id, data.email, data.displayName, createdAt, data.photoUrl);
  }

  async findByEmail(email: string): Promise<User | null> {
    const snapshot = await this.collection.where('email', '==', email).limit(1).get();
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    const data = doc.data() as any;
    const createdAt = data.createdAt ? data.createdAt.toDate() : new Date();
    return new User(doc.id, data.email, data.displayName, createdAt, data.photoUrl);
  }

  async save(user: User): Promise<void> {
    await this.collection.doc(user.id).set({
      email: user.email,
      displayName: user.displayName,
      createdAt: user.createdAt,
      photoUrl: user.photoUrl ?? null
    });
  }
}
