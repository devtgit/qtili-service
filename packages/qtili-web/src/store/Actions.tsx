import { useCallback } from "react";
import { useAtomCallback } from "jotai/utils";
import produce from "immer";
import { State } from "@/store/State";
import { UIState } from "@/store/UIState";
import { StatState } from "@/store/StatState";
import { getLesson } from "@/api";
import { SetAnswerPayload, submitAnswer } from "@/db/types";
import { ChoiceQuestion } from "@/db/questions/ChoiceQuestion";
import { ComposeQuestion } from "@/db/questions/ComposeQuestion";

export const Actions = new (class {
  useStartLesson = () =>
    useAtomCallback(
      useCallback(async (get, set) => {
        set(UIState.lessonMode, true);

        const lessonPromise = getLesson();

        set(State.initialized, lessonPromise);

        const lesson = await lessonPromise;

        set(State.questionsOrdering, lesson.questionsOrdering);
        set(State.questions, lesson.questionsRecord);
        set(State.answers, lesson.answersRecord);
      }, [])
    );

  useToNextQuestion = () => {
    const resetState = this.useResetState();

    return useAtomCallback(
      useCallback((get, set) => {
        const lessonPageType = get(State.lessonPageType);

        if (lessonPageType.type === "result") {
          set(UIState.lessonMode, false);
          resetState();
          return;
        }

        const count = get(State.questionsCount);
        const currentQuestionIndex = get(State.currentQuestionIndex);

        if (currentQuestionIndex < count - 1) {
          set(State.currentQuestionIndex, (index) =>
            Math.min(count - 1, index + 1)
          );
          return;
        }

        const correctCount = get(State.correctCount);
        const score = Math.floor((correctCount / count) * 100);

        set(State.lessonPageType, { type: "result", score });
        set(StatState.lessonsCount, (x) => x + 1);
      }, [])
    );
  };

  useToPreviousQuestion = () =>
    useAtomCallback(
      useCallback((get, set) => {
        set(State.currentQuestionIndex, (index) => Math.max(0, index - 1));
      }, [])
    );

  useSetAnswer = () =>
    useAtomCallback(
      useCallback((get, set, questionId: string, payload: SetAnswerPayload) => {
        set(
          State.answers,
          produce((draft) => {
            const answer = draft[questionId];
            if (
              ChoiceQuestion.isAnswer(answer) &&
              ChoiceQuestion.isSetAnswerPayload(payload)
            ) {
              return ChoiceQuestion.setAnswer(answer, payload);
            }

            if (
              ComposeQuestion.isAnswer(answer) &&
              ComposeQuestion.isSetAnswerPayload(payload)
            ) {
              return ComposeQuestion.setAnswer(answer, payload);
            }
          })
        );
      }, [])
    );

  useSubmitAnswer = () =>
    useAtomCallback(
      useCallback((get, set, questionId: string) => {
        const question = get(State.questionAtomFamily(questionId));

        set(
          State.answers,
          produce((draft) => {
            const answer = draft[questionId];
            submitAnswer(answer, question);
          })
        );
      }, [])
    );

  useExitLesson = () => {
    const resetState = this.useResetState();

    return useAtomCallback(
      useCallback((get, set) => {
        set(UIState.lessonMode, false);
        resetState();
      }, [])
    );
  };

  useResetState = () =>
    useAtomCallback(
      useCallback((get, set) => {
        const ids = get(State.questionsOrdering);

        set(State.lessonPageType, { type: "question" });
        set(State.questionsOrdering, []);
        set(State.questions, {});
        set(State.currentQuestionIndex, 0);

        for (const id of ids) {
          State.answerAtomFamily.remove(id);
          State.questionAtomFamily.remove(id);
        }
      }, [])
    );
})();
