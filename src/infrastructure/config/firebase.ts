import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import * as dotenv from 'dotenv';

dotenv.config();

// Only use emulators if explicitly requested in the environment
if (process.env.USE_FIREBASE_EMULATOR === 'true') {
  process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
  process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
}

initializeApp({
  projectId: process.env.FIREBASE_PROJECT_ID || 'unimar-ddd'
});

export const db = getFirestore();
export const auth = getAuth();
