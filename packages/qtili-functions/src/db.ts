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
  phrases: string;
};

type Word = Entity & {
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
      phrases: data.phrases,
    };
  },
};

export const WORD_CONVERTER: FirestoreDataConverter<Word> = {
  toFirestore: (word: Word) => {
    return word;
  },
  fromFirestore: (snapshot): Word => {
    const data = snapshot.data();
    return {
      id: snapshot.ref.id,
      createdate: data.createdate,
      lastupdate: data.lastupdate,
      createdby: data.createdby,
      updatedby: data.updatedby,
      wd: data.wd,
      tr: data.tr,
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

  let words = [
    ...lesson.words.split(/\r?\n/),
    ...lesson.phrases
      .split(/\r?\n/)
      .flatMap((row) => row.split(", ")[0].split(" ")),
  ];
  // logger.info("words", words);

  const wordsDict: Record<string, Word> = {};
  await Promise.all(
    words.map(async (word) => {
      const snapshot = await db
        .collection("dict_kz_ru")
        .where("wd", "==", word)
        .limit(1)
        .withConverter(WORD_CONVERTER)
        .get();
      if (!snapshot.empty) {
        const word = snapshot.docs[0].data();
        wordsDict[word.wd] = word;
      }
    })
  );

  logger.info("words before", words);
  logger.info("words dict", wordsDict);

  words = words.filter((word) => {
    return !wordsDict[word];
  });

  logger.info("words after", words);

  if (!process.env.FUNCTIONS_EMULATOR) {
    // upload files
    await Promise.all(
      words.map(async (word) => {
        // logger.info("start uploading", word);
        const response = await soundWord(word);
        // logger.info("response", word);
        return uploadFile(response.data, word);
      })
    );
  }

  // logger.info("res", res);

  const translations = await translateWords(words);
  // logger.info("translations", translations);

  const batch = db.batch();
  for (let i = 0; i < words.length; i++) {
    const wd = words[i];
    const tr = translations[i];

    const entry: Omit<Word, "id"> = {
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
