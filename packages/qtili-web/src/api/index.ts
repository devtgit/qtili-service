import { nanoid } from "nanoid";
import {
  collection,
  doc,
  getDoc,
  limit,
  query,
  where,
} from "firebase/firestore/lite";
import { Choice, Lesson, Question, Word } from "@/types";
import { db, storage } from "@/firebase/config";
import { getFirstDocumentData } from "@/api/utils";
import { getBlob, ref } from "firebase/storage";
import { Recommend } from "@mui/icons-material";

const choicesCount = 4;

export const getLesson = async () => {
  const lessonDoc = await getDoc(doc(db, `lessons_draft/A7Nu35d3S5FB6Hz0RMC0`));
  const lesson = { id: lessonDoc.id, ...lessonDoc.data() } as Lesson;

  // set minimum timeout for downloading
  const delayPromise = new Promise((r) => setTimeout(r, 1300)).then();

  // load words
  const allWords = (await Promise.all(
    lesson.words
      .split(/\r?\n/)
      .map((word) =>
        getFirstDocumentData(
          query(collection(db, `dict_kz_ru`), where("wd", "==", word), limit(1))
        )
      )
  )) as Word[];
  const wordsDict = Object.fromEntries(allWords.map((x) => [x.id, x]));
  allWords.sort((a, b) => a.wd.localeCompare(b.wd));

  await Promise.all(allWords.map((word) => getSound(word.wd)));

  await delayPromise;

  function makeChoice(wordId: string): Choice {
    // get choice by id from dict
    // we need dict because creating choices is not one loop operation
    const word = wordsDict[wordId]!;
    return {
      id: nanoid(),
      text: word.wd,
      pic: word.pic,
      snd: word.snd,
    };
  }

  const questions: Question[] = [];

  for (let wordIndex = 0; wordIndex < allWords.length; wordIndex++) {
    const word = allWords[wordIndex];
    const wordId = word.id;

    // fill choices
    const correctChoice = makeChoice(wordId);
    const choices: Choice[] = [correctChoice];
    const questionWords = Array.from(allWords);
    questionWords.splice(wordIndex, 1);

    for (const _ of new Array(choicesCount - 1).fill(1)) {
      const wordIndex = rand(questionWords.length - 1);
      const word = questionWords[wordIndex];
      const wordId = word.id;

      choices.push(makeChoice(wordId));
      questionWords.splice(wordIndex, 1);
    }
    choices.sort(randomCompare); // random sort

    // fill question
    questions.push({
      id: nanoid(),
      word: wordsDict[wordId].tr,
      correctChoiceId: correctChoice.id,
      correctChoiceText: correctChoice.text,
      choices,
    });
  }

  questions.sort(randomCompare); // random sort

  return {
    questionsOrdering: questions.map((x) => x.id),
    questionsRecord: Object.fromEntries(questions.map((x) => [x.id, x])),
  };
};

const sounds: Record<string, string> = {};

export async function getSound(word: string) {
  if (sounds[word]) {
    return sounds[word];
  }

  const blob = await getBlob(ref(storage, `snd/${word}.mp3`));
  const src = URL.createObjectURL(blob);

  sounds[word] = src;
  return src;
}

function range(size: number, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt);
}
function rand(max: number, min: number = 0) {
  return Math.floor(Math.random() * max) + min;
}
function randomCompare(a: { id: string }, b: { id: string }) {
  return a.id.localeCompare(b.id);
}
