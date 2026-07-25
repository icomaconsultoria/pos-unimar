import { auth } from '../config/firebase';
import { AuthService } from '../../domain/services/AuthService';

export class FirebaseAuthService implements AuthService {
  async createUser(email: string, password?: string, displayName?: string, uid?: string, photoUrl?: string): Promise<{ uid: string }> {
    const userRecord = await auth.createUser({
      uid,
      email,
      password,
      displayName,
      photoURL:photoUrl
    });
    
    return { uid: userRecord.uid };
  }
}
