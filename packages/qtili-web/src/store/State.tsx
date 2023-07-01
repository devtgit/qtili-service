import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { Answer, Question, LessonPageType } from "@/db/types";

export const State = new (class {
  // source
  initialized = atom(new Promise(() => {}));
  lessonPageType = atom<LessonPageType>({ type: "question" });
  questionsOrdering = atom<string[]>([]);
  questions = atom<Record<string, Question>>({});
  answers = atom<Record<string, Answer>>({});
  currentQuestionIndex = atom<number>(0);

  // calculated
  questionsCount = atom((get) => get(this.questionsOrdering).length);
  submittedCount = atom((get) => {
    const ids = get(this.questionsOrdering);
    return ids.filter((id) => get(this.answerAtomFamily(id)).isSubmitted)
      .length;
  });
  correctCount = atom((get) => {
    const ids = get(this.questionsOrdering);
    return ids.filter((id) => get(this.answerAtomFamily(id)).isCorrect).length;
  });
  currentQuestionId = atom(
    (get) => get(this.questionsOrdering)[get(this.currentQuestionIndex)]
  );
  questionAtomFamily = atomFamily((id: string) =>
    atom((get) => get(this.questions)[id])
  );
  answerAtomFamily = atomFamily((id: string) =>
    atom((get) => get(this.answers)[id])
  );
  isSubmitted = atomFamily((id: string) =>
    atom((get) => get(this.answerAtomFamily(id)).isSubmitted)
  );

  // dev
  json = atom((get) => {
    const ids = get(this.questionsOrdering);
    const currentQuestionId = get(this.currentQuestionId);
    const questions = get(this.questions);
    const answers: Record<string, Answer> = {};

    for (const id of ids) {
      answers[id] = get(this.answerAtomFamily(id));
    }

    return {
      currentQuestionId,
      questions,
      answers,
    };
  });
})();
