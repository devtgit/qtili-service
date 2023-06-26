import * as logger from "firebase-functions/logger";
import { Timestamp } from "firebase-admin/firestore";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import { db, storage } from "./firebase";
import { translateWords } from "./translate";
import { soundWord } from "./sound";

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

const uploadFile = async (stream: Readable, name: string) => {
  const bucket = storage.bucket();

  const file = bucket.file(`snd/${name}.mp3`);
  const writeStream = file.createWriteStream({
    contentType: "audio/mp3",
    public: true,
  });

  logger.info("write stream", stream, file, name);

  return await pipeline(stream, writeStream);
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

  // upload files
  const res = await Promise.all(
    words.map(async (word) => {
      logger.info("start uploading", word);
      const response = await soundWord(word);
      logger.info("response", word);
      return uploadFile(response.data, word);
    })
  );

  logger.info("res", res);

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
