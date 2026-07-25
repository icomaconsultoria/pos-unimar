"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseAuthService = void 0;
const firebase_1 = require("../config/firebase");
class FirebaseAuthService {
    async createUser(email, password, displayName, uid, photoUrl) {
        const userRecord = await firebase_1.auth.createUser({
            uid,
            email,
            password,
            displayName,
            photoURL: photoUrl
        });
        return { uid: userRecord.uid };
    }
}
exports.FirebaseAuthService = FirebaseAuthService;
