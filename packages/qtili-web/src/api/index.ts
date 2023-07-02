import { nanoid } from "nanoid";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore/lite";
import { Answer, Lesson, makeAnswer, Question, Word } from "@/db/types";
import { db, storage } from "@/firebase/config";
import { getBlob, ref } from "firebase/storage";
import { Choice, ChoiceType } from "@/db/questions/ChoiceQuestion";
import { ComposeType } from "@/db/questions/ComposeQuestion";

const choicesCount = 4;

export const getLesson = async () => {
  const lessonDoc = await getDoc(doc(db, `lessons_draft/A7Nu35d3S5FB6Hz0RMC0`));
  const lesson = { id: lessonDoc.id, ...lessonDoc.data() } as Lesson;

  // set minimum timeout for downloading
  const delayPromise = new Promise((r) => setTimeout(r, 1300)).then();

  // TODO: mb use csv parser
  const choiceWds = lesson.words.split(/\r?\n/).slice(3);
  const composeWords = lesson.phrases
    .split(/\r?\n/)
    .flatMap((row) => row.split(", ")[0].split(" "));
  const words = [...choiceWds, ...composeWords];

  const wordsByWd: Record<string, Word> = {};
  const wordsById: Record<string, Word> = {};
  // load words
  await Promise.all(
    words.map(async (word) => {
      const snapshot = await getDocs(
        query(collection(db, `dict_kz_ru`), where("wd", "==", word), limit(1))
      );
      if (!snapshot.empty) {
        const word = snapshot.docs[0].data() as Word;
        wordsByWd[word.wd] = word;
        wordsById[word.id] = word;
      }
    })
  );

  await Promise.all(words.map((word) => getSound(word)));

  await delayPromise;

  function makeChoice(wordWd: string): Choice {
    // get choice by id from dict
    // we need dict because creating choices is not one loop operation
    const word = wordsByWd[wordWd]!;
    return {
      id: nanoid(),
      text: word.wd,
      pic: word.pic,
      snd: word.snd,
    };
  }

  const questions: Question[] = [];
  const answers: Answer[] = [];

  for (let wordIndex = 0; wordIndex < choiceWds.length; wordIndex++) {
    const wordWd = choiceWds[wordIndex];
    const word = wordsByWd[wordWd];
    const wordId = word.id;

    // fill choices
    const correctChoice = makeChoice(wordWd);
    const choices: Choice[] = [correctChoice];
    const questionWds = Array.from(choiceWds); // clone array
    questionWds.splice(wordIndex, 1);

    for (const _ of new Array(choicesCount - 1).fill(1)) {
      const wordIndex = rand(questionWds.length - 1);
      const wordWd = choiceWds[wordIndex];
      const word = wordsByWd[wordWd];
      const wordId = word.id;

      choices.push(makeChoice(wordWd));
      questionWds.splice(wordIndex, 1);
    }
    choices.sort(randomCompare); // random sort

    // fill question
    const id = nanoid();
    questions.push({
      id,
      type: ChoiceType,
      word: wordsByWd[wordWd].tr,
      correctChoiceId: correctChoice.id,
      correctChoiceText: correctChoice.text,
      choices,
    });
    answers.push(makeAnswer(ChoiceType, id));
  }

  for (const row of lesson.phrases.split(/\r?\n/)) {
    const [phraseWd, phraseTr] = row.split(", ");
    const wds = phraseWd.split(" ");

    const correctWordsOrdering = wds.map((wd) => wordsByWd[wd].id);
    const initialWords = wds.map((wd) => wordsByWd[wd]).sort(randomCompare);
    const initialWordsOrdering = initialWords.map((word) => word.id);

    const id = nanoid();
    questions.unshift({
      id,
      type: ComposeType,
      phrase: phraseTr,
      correctWordsOrdering,
      initialWordsOrdering: initialWordsOrdering,
      words: wordsById, // TODO: mb localize wordsByWd or vice versa extract wordsByWd to lesson level?
      correctChoiceText: phraseWd,
    });
    answers.unshift(makeAnswer(ComposeType, id));
  }

  questions.sort(randomCompare); // random sort

  return {
    questionsOrdering: questions.map((x) => x.id),
    questionsRecord: Object.fromEntries(questions.map((x) => [x.id, x])),
    answersRecord: Object.fromEntries(answers.map((x) => [x.id, x])),
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
