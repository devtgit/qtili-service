import { nanoid } from 'nanoid'
import { Choice, Lesson, Question, Word } from '@/types'
import { doc, getDoc } from 'firebase/firestore/lite'
import { db } from '@/firebase/config'

const choicesCount = 4

export const getLesson = async () => {
  const lessonDoc = await getDoc(doc(db, `lessons/0gYfg0pAPPQdSYYALXW9`))
  const lesson = { id: lessonDoc.id, ...lessonDoc.data() } as Lesson
  const allWords: Word[] = []
  const wordsDict: Record<string, Word> = {}

  // set minimum timeout for downloading
  const delayPromise = new Promise((r) => setTimeout(r, 1300)).then()

  // get words from dictionary using lesson.word_ids
  const wordDocs = await Promise.all(
    lesson.word_ids.map((wordId) => getDoc(doc(db, `kz_ru/${wordId}`)))
  )

  // fill wordsDict and allWords
  for (const wordDoc of wordDocs) {
    const word = { id: wordDoc.id, ...wordDoc.data() } as Word
    allWords.push(word)
    wordsDict[wordDoc.id] = word
  }

  allWords.sort((a, b) => a.wd.localeCompare(b.wd))

  // extract pics
  const word_to_pic = Object.fromEntries(
    range(allWords.length).map((i) => [allWords[i].id, { pic: String(i + 1) }])
  )
  // extract sound
  const word_to_snd = Object.fromEntries(
    range(allWords.length).map((i) => [allWords[i].id, { snd: String(i + 1) }])
  )

  await delayPromise

  function makeChoice(wordId: string): Choice {
    console.log(wordId)
    return {
      id: nanoid(),
      text: wordsDict[wordId].wd,
      pic: word_to_pic[wordId].pic,
      snd: word_to_snd[wordId].snd,
    }
  }

  const questions: Question[] = []

  for (let wordIndex = 0; wordIndex < allWords.length; wordIndex++) {
    const wordId = allWords[wordIndex].id

    // fill choices
    const correctChoice = makeChoice(wordId)
    const choices: Choice[] = [correctChoice]
    const words = Array.from(allWords)
    words.splice(wordIndex, 1)

    for (const _ of new Array(choicesCount - 1).fill(1)) {
      const wordIndex = rand(words.length - 1)
      const wordId = words[wordIndex].id

      choices.push(makeChoice(wordId))

      words.splice(wordIndex, 1)
    }
    choices.sort(randomCompare) // random sort

    // fill question
    questions.push({
      id: nanoid(),
      word: wordsDict[wordId].tr,
      correctChoiceId: correctChoice.id,
      correctChoiceText: correctChoice.text,
      choices,
    })
  }

  questions.sort(randomCompare) // random sort

  return {
    questionsOrdering: questions.map((x) => x.id),
    questionsRecord: Object.fromEntries(questions.map((x) => [x.id, x])),
  }
}

function range(size: number, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt)
}
function rand(max: number, min: number = 0) {
  return Math.floor(Math.random() * max) + min
}
function randomCompare(a: { id: string }, b: { id: string }) {
  return a.id.localeCompare(b.id)
}
