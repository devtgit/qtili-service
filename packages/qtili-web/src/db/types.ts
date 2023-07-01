import {
  ChoiceAnswer,
  ChoiceQuestion,
  SetChoiceAnswerPayload,
} from "@/db/questions/ChoiceQuestion";
import {
  ComposeAnswer,
  ComposeQuestion,
  SetComposeAnswerPayload,
} from "@/db/questions/ComposeQuestion";

type QuestionPageType = {
  type: "question";
};

type ResultPageType = {
  type: "result";
  score: number;
};

export type LessonPageType = QuestionPageType | ResultPageType;

export type Lesson = {
  id: string;
  title: string;
  word_ids: string[];
  words: string;
};

export type Word = {
  id: string;
  wd: string;
  tr: string;
  pic: string;
  snd: string;
};

export type Question = ChoiceQuestion | ComposeQuestion;
export type Answer = ChoiceAnswer | ComposeAnswer;
export type QuestionType = Question["type"] & Answer["type"];
export type SetAnswerPayload = SetChoiceAnswerPayload | SetComposeAnswerPayload;

export function makeAnswer(questionType: QuestionType, id: string): Answer {
  switch (questionType) {
    case "Compose":
      return ComposeQuestion.makeAnswer(id);
    case "Choice":
      return ChoiceQuestion.makeAnswer(id);
  }
}

export function submitAnswer(answer: Answer, question: Question) {
  if (answer.type === "Compose" && question.type === "Compose") {
    return ComposeQuestion.submitAnswer(answer, question);
  }

  if (answer.type === "Choice" && question.type === "Choice") {
    return ChoiceQuestion.submitAnswer(answer, question);
  }
}

export function getIsAnswered(answer: Answer): boolean {
  if (answer.type === "Compose") {
    return ComposeQuestion.getIsAnswered(answer);
  }

  if (answer.type === "Choice") {
    return ChoiceQuestion.getIsAnswered(answer);
  }

  return true;
}
