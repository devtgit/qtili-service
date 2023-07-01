import { BaseAnswer, BaseQuestion } from "@/db/base";
import { Answer, SetAnswerPayload } from "@/db/types";

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

export type SetChoiceAnswerPayload = {
  questionType: ChoiceType;
} & { type: "SET_ANSWER"; choiceId: string };

export const ChoiceQuestion = {
  isAnswer(answer: Answer): answer is ChoiceAnswer {
    return answer.type === ChoiceType;
  },
  isSetAnswerPayload(
    payload: SetAnswerPayload
  ): payload is SetChoiceAnswerPayload {
    return payload.questionType === ChoiceType;
  },
  makeAnswer(id: string): ChoiceAnswer {
    return {
      id,
      type: ChoiceType,
      isSubmitted: false,
      selectedId: undefined,
      isCorrect: false,
    };
  },
  setAnswer(answer: ChoiceAnswer, action: SetChoiceAnswerPayload): void {
    answer.selectedId = action.choiceId;
  },
  submitAnswer(answer: ChoiceAnswer, question: ChoiceQuestion): void {
    answer.isSubmitted = true;
    answer.isCorrect = question.correctChoiceId === answer.selectedId;
  },
  getIsAnswered(answer: ChoiceAnswer): boolean {
    return answer.selectedId != null;
  },
};
