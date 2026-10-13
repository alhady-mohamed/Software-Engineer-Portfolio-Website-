import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDocFromServer,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  Firestore,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with specific database ID if provided
export const db: Firestore = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export interface FirebaseDiagnostics {
  connected: boolean;
  message: string;
  projectId: string;
  databaseId: string;
  projectsCount: number;
  timelinesCount: number;
  testimonialsCount: number;
  messagesCount: number;
  lastChecked: string;
}

/**
 * Validates connection to Firestore.
 */
export const testFirebaseConnection = async (): Promise<{ success: boolean; message: string }> => {
  try {
    // Ping Firestore
    await getDocs(collection(db, 'projects'));
    return {
      success: true,
      message: 'Xiriirka Firebase Firestore waa diyaar oo si toos ah ayuu u shaqaynayaa!',
    };
  } catch (err: any) {
    console.error('Firebase connection test failed:', err);
    return {
      success: false,
      message: `Cilad Firebase: ${err.message || 'Lama xidhiidhi karin'}`,
    };
  }
};

/**
 * Detailed live diagnostic to check all Firestore collections and document counts.
 */
export const getFirebaseDiagnostics = async (): Promise<FirebaseDiagnostics> => {
  try {
    const [pSnap, tSnap, tmSnap, mSnap] = await Promise.all([
      getDocs(collection(db, 'projects')),
      getDocs(collection(db, 'timelines')),
      getDocs(collection(db, 'testimonials')),
      getDocs(collection(db, 'contact_messages')),
    ]);

    return {
      connected: true,
      message: 'Firebase Firestore waa shidan yahay oo si toos ah ayuu u xiran yahay!',
      projectId: firebaseConfig.projectId,
      databaseId: firebaseConfig.firestoreDatabaseId || '(default)',
      projectsCount: pSnap.size,
      timelinesCount: tSnap.size,
      testimonialsCount: tmSnap.size,
      messagesCount: mSnap.size,
      lastChecked: new Date().toLocaleTimeString(),
    };
  } catch (err: any) {
    return {
      connected: false,
      message: err.message || 'Cilad xiriir Firestore',
      projectId: firebaseConfig.projectId,
      databaseId: firebaseConfig.firestoreDatabaseId || '(default)',
      projectsCount: 0,
      timelinesCount: 0,
      testimonialsCount: 0,
      messagesCount: 0,
      lastChecked: new Date().toLocaleTimeString(),
    };
  }
};
