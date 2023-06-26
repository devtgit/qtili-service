import {
  getDocs,
  Query,
  DocumentReference,
  getDoc,
} from "firebase/firestore/lite";

export const getDocumentData = async <T>(
  ref: DocumentReference<T>
): Promise<T | null> => {
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
};

export const getFirstDocumentData = async <T>(
  q: Query<T>
): Promise<T | null> => {
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    return snapshot.docs[0].data();
  }

  return null;
};

export const getCollectionData = async <T>(q: Query<T>): Promise<T[]> => {
  const snapshot = await getDocs(q);
  return snapshot.docs.map((snapshot) => snapshot.data());
};
