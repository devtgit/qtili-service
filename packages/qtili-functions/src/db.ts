import * as logger from "firebase-functions/logger";
import { Timestamp } from "firebase-admin/firestore";
import { db } from "./firebase";
import { translateWords } from "./translate";

export interface DocumentData {
  [field: string]: any;
}
export interface QueryDocumentSnapshot<T = DocumentData> {
  data(): T;
  [field: string]: any;
}

export interface FirestoreDataConverter<T> {
  toFirestore(modelObject: T): DocumentData;
  fromFirestore(snapshot: QueryDocumentSnapshot): T;
}

export interface Entity {
  id: string;
  createdate: any;
  lastupdate: any;
  createdby: string;
  updatedby: string;
}

type Lesson = Entity & {
  title: string;
  words: string;
};

type Dict = Entity & {
  wd: string;
  tr: string;
};

export const LESSON_CONVERTER: FirestoreDataConverter<Lesson> = {
  toFirestore: (lesson: Lesson) => {
    return lesson;
  },
  fromFirestore: (snapshot): Lesson => {
    const data = snapshot.data();
    return {
      id: snapshot.ref.id,
      createdate: data.createdate,
      lastupdate: data.lastupdate,
      createdby: data.createdby,
      updatedby: data.updatedby,
      title: data.title,
      words: data.words,
    };
  },
};

export const generateLesson = async (lessonId: string, userEmail: string) => {
  const snapshot = await db
    .doc(`lessons_draft/${lessonId}`)
    .withConverter(LESSON_CONVERTER)
    .get();

  logger.info("snapshot", snapshot);

  const lesson = snapshot.data();

  logger.info("lesson", lesson);

  if (!lesson) {
    throw new Error("no lesson");
  }

  const words = lesson.words.split(/\r?\n/);
  logger.info("words", words);
  const translations = await translateWords(words);
  logger.info("translations", translations);

  const batch = db.batch();
  for (let i = 0; i < words.length; i++) {
    const wd = words[i];
    const tr = translations[i];

    const entry: Omit<Dict, "id"> = {
      createdate: Timestamp.now(),
      lastupdate: Timestamp.now(),
      createdby: userEmail,
      updatedby: userEmail,
      wd,
      tr,
    };

    const doc = db.collection("dict_kz_ru").doc();
    batch.set(doc, { id: doc.id, ...entry });
  }

  await batch.commit();
};
