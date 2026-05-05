import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  Timestamp
} from "firebase/firestore";

export interface AuditLog {
  id?: string;
  action: string;
  performedBy: string;
  performedByName: string;
  performedByRole: string;
  targetId: string;
  targetName: string;
  details: string;
  timestamp: Date;
}

export async function logAction(params: {
  action: string;
  performedBy: string;
  performedByName: string;
  performedByRole: string;
  targetId?: string;
  targetName?: string;
  details: string;
}): Promise<void> {
  await addDoc(collection(db, "audit_logs"), {
    action: params.action,
    performedBy: params.performedBy,
    performedByName: params.performedByName,
    performedByRole: params.performedByRole,
    targetId: params.targetId || "",
    targetName: params.targetName || "",
    details: params.details,
    timestamp: Timestamp.now(),
  });
}

export async function getAuditLogs(limitCount: number = 100): Promise<AuditLog[]> {
  const q = query(
    collection(db, "audit_logs"),
    orderBy("timestamp", "desc"),
    limit(limitCount)
  );
  
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      action: data.action,
      performedBy: data.performedBy,
      performedByName: data.performedByName,
      performedByRole: data.performedByRole,
      targetId: data.targetId,
      targetName: data.targetName,
      details: data.details,
      timestamp: data.timestamp?.toDate() || new Date(),
    } as AuditLog;
  });
}
