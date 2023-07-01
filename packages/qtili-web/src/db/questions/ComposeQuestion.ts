import { BaseAnswer, BaseQuestion } from "@/db/base";

export type ComposeType = "Compose";
export const ComposeType: ComposeType = "Compose";

export type ComposeQuestion = BaseQuestion & {
  type: ComposeType;
};

export type ComposeAnswer = BaseAnswer & {
  type: ComposeType;
};

export type SetComposeAnswerOptions = {
  choiceId: string;
};

export const ComposeQuestion = {
  makeAnswer(id: string): ComposeAnswer {
    return {
      id,
      type: ComposeType,
      isSubmitted: false,
      isCorrect: false,
    };
  },
  setAnswer(answer: ComposeAnswer, options: SetComposeAnswerOptions): void {},
  submitAnswer(answer: ComposeAnswer, question: ComposeQuestion): void {
    answer.isSubmitted = true;
  },
  getIsAnswered(answer: ComposeAnswer): boolean {
    return true;
  },
};
