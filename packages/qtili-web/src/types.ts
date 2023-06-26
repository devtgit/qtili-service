type QuestionPageType = {
  type: 'question'
}

type ResultPageType = {
  type: 'result'
  score: number
}

export type LessonPageType = QuestionPageType | ResultPageType

export type Lesson = {
  id: string
  title: string
  word_ids: string[]
}

export type Word = {
  id: string
  wd: string
  tr: string
}

export type Question = {
  id: string
  // type: string
  // text: string
  word: string
  choices: Choice[]
  correctChoiceId: string
  correctChoiceText: string
}

export type Choice = {
  id: string
  text: string
  pic: string | undefined
  snd: string | undefined
}

export type Answer = {
  isSubmitted: boolean
  selectedId: string | undefined
  isCorrect: boolean
}
