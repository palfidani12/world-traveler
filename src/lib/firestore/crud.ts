import {
  QueryConstraint,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/config";

export type FirestoreEntity = {
  id: string;
};

export type CreateInput<T extends FirestoreEntity> = Omit<T, "id"> & Partial<Pick<T, "id">>;

export type ListOptions = {
  constraints?: QueryConstraint[];
};

export function createCrudRepository<T extends FirestoreEntity>(collectionName: string) {
  const collectionRef = collection(db, collectionName);

  return {
    async create(input: CreateInput<T>): Promise<T> {
      const docId = input.id ?? doc(collectionRef).id;
      const entity = {
        ...input,
        id: docId,
      } as T;

      await setDoc(doc(collectionRef, docId), entity);
      return entity;
    },

    async createAutoId(input: Omit<T, "id">): Promise<T> {
      const docRef = await addDoc(collectionRef, input);
      const entity = {
        ...input,
        id: docRef.id,
      } as T;

      await setDoc(docRef, entity);
      return entity;
    },

    async getById(id: string): Promise<T | null> {
      const snapshot = await getDoc(doc(collectionRef, id));
      if (!snapshot.exists()) return null;
      return snapshot.data() as T;
    },

    async list(options?: ListOptions): Promise<T[]> {
      const q = options?.constraints?.length
        ? query(collectionRef, ...options.constraints)
        : collectionRef;

      const snapshot = await getDocs(q);
      return snapshot.docs.map((documentSnapshot) => documentSnapshot.data() as T);
    },

    async findByField<K extends keyof T>(field: K, value: T[K]): Promise<T[]> {
      const q = query(collectionRef, where(String(field), "==", value));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((documentSnapshot) => documentSnapshot.data() as T);
    },

    async update(id: string, updates: Partial<T>): Promise<void> {
      const { id: _ignored, ...updatePayload } = updates as Partial<T> & { id?: string };
      await updateDoc(doc(collectionRef, id), updatePayload);
    },

    async upsert(entity: T): Promise<void> {
      await setDoc(doc(collectionRef, entity.id), entity, { merge: true });
    },

    async remove(id: string): Promise<void> {
      await deleteDoc(doc(collectionRef, id));
    },

    subscribeById(id: string, onData: (data: T | null) => void) {
      return onSnapshot(doc(collectionRef, id), (snapshot) => {
        if (!snapshot.exists()) {
          onData(null);
          return;
        }

        onData(snapshot.data() as T);
      });
    },

    subscribeList(onData: (data: T[]) => void, options?: ListOptions) {
      const q = options?.constraints?.length
        ? query(collectionRef, ...options.constraints)
        : collectionRef;

      return onSnapshot(q, (snapshot) => {
        onData(snapshot.docs.map((documentSnapshot) => documentSnapshot.data() as T));
      });
    },
  };
}
