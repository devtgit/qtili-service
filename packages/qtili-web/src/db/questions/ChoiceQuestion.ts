import { BaseAnswer, BaseQuestion } from "@/db/base";

export type ChoiceType = "Choice";
export const ChoiceType: ChoiceType = "Choice";

export type ChoiceQuestion = BaseQuestion & {
  type: ChoiceType;
  word: string;
  choices: Choice[];
  correctChoiceId: string;
};

export type Choice = {
  id: string;
  text: string;
  pic: string | undefined;
  snd: string | undefined;
};

export type ChoiceAnswer = BaseAnswer & {
  type: ChoiceType;
  selectedId: string | undefined;
};

export type SetChoiceAnswerOptions = {
  choiceId: string;
};

export const ChoiceQuestion = {
  makeAnswer(id: string): ChoiceAnswer {
    return {
      id,
      type: ChoiceType,
      isSubmitted: false,
      selectedId: undefined,
      isCorrect: false,
    };
  },
  setAnswer(answer: ChoiceAnswer, options: SetChoiceAnswerOptions): void {
    answer.selectedId = options.choiceId;
  },
  submitAnswer(answer: ChoiceAnswer, question: ChoiceQuestion): void {
    answer.isSubmitted = true;
    answer.isCorrect = question.correctChoiceId === answer.selectedId;
  },
  getIsAnswered(answer: ChoiceAnswer): boolean {
    return answer.selectedId != null;
  },
};
