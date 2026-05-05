import { db } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  orderBy,
  where,
  limit,
} from "firebase/firestore";

export type UserRole = "admin" | "employee" | "viewer";

export interface AppUser {
  uid: string;
  email: string;
  username: string;
  displayName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  createdBy: string;
}

export async function getUserProfile(uid: string): Promise<AppUser | null> {
  const docRef = doc(db, "users", uid);
  const snapshot = await getDoc(docRef);
  
  if (!snapshot.exists()) return null;
  
  const data = snapshot.data();
  return {
    ...data,
    uid: snapshot.id,
    createdAt: data.createdAt?.toDate() || new Date(),
  } as AppUser;
}


export async function updateUserRole(uid: string, newRole: UserRole): Promise<void> {
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, { role: newRole });
}

export async function toggleUserActive(uid: string, isActive: boolean): Promise<void> {
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, { isActive });
}

export async function getAllUsers(): Promise<AppUser[]> {
  const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      ...data,
      uid: doc.id,
      createdAt: data.createdAt?.toDate() || new Date(),
    } as AppUser;
  });
}

/**
 * Given a username (no @ sign), looks up the Firestore users collection
 * and returns the matching user's email. Returns null if not found.
 * Used by the login page to support username-based login.
 */
export async function getEmailByUsername(username: string): Promise<string | null> {
  const q = query(
    collection(db, "users"),
    where("username", "==", username.trim().toLowerCase()),
    limit(1)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return snapshot.docs[0].data().email as string;
}
