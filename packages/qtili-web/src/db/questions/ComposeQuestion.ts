import isEqual from "lodash/isEqual";
import { BaseAnswer, BaseQuestion } from "@/db/base";
import { Word } from "@/db/types";

export type ComposeType = "Compose";
export const ComposeType: ComposeType = "Compose";

export type ComposeQuestion = BaseQuestion & {
  type: ComposeType;
  phrase: string;
  correctWordsOrdering: string[];
  initialWordsOrdering: string[];
  words: Record<string, Word>;
};

export type ComposeAnswer = BaseAnswer & {
  type: ComposeType;
  result: string[];
};

export type SetComposeAnswerOptions =
  | { type: "MOVE_TO_RESULT"; activeId: string }
  | {
      type: "REORDER_ITEMS";
      activeIndex: number;
      overIndex: number;
    }
  | {
      type: "MOVE_TO_CHOICE";
      activeIndex: number;
    };

export const ComposeQuestion = {
  makeAnswer(id: string): ComposeAnswer {
    return {
      id,
      type: ComposeType,
      isSubmitted: false,
      isCorrect: false,
      result: [],
    };
  },
  setAnswer(answer: ComposeAnswer, action: SetComposeAnswerOptions): void {
    if (action.type === "MOVE_TO_RESULT") {
      const { activeId } = action;

      if (answer.result.indexOf(activeId) == -1) {
        answer.result.push(activeId);
      }

      return;
    }

    if (action.type === "REORDER_ITEMS") {
      const { activeIndex, overIndex } = action;

      const [activeId] = answer.result.splice(activeIndex, 1);
      answer.result.splice(overIndex, 0, activeId);

      return;
    }

    if (action.type === "MOVE_TO_CHOICE") {
      const { activeIndex } = action;

      answer.result.splice(activeIndex, 1);
      return;
    }
  },
  submitAnswer(answer: ComposeAnswer, question: ComposeQuestion): void {
    answer.isSubmitted = true;
    answer.isCorrect = isEqual(answer.result, question.correctWordsOrdering);
  },
  getIsAnswered(answer: ComposeAnswer): boolean {
    return answer.result.length > 0;
  },
};
