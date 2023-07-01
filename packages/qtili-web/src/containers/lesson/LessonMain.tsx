import React, { useEffect } from "react";
import { useAtomValue } from "jotai";
import { State } from "@/store/State";
import { Actions } from "@/store/Actions";
import { AppContainer } from "@/components/AppContainer";
import { ProgressBar } from "@/components/ProgressBar";
import { LessonSlider } from "@/components/LessonSlider";
import { QuestionCard } from "@/containers/lesson/cards/QuestionCard";
import { DebuggerJson } from "@/containers/debug/DebuggerJson";
import { AnswerFeedback } from "@/containers/lesson/answer/AnswerFeedback";
import { Button } from "@/components/Button";
import { ExitLessonButton } from "@/containers/lesson/ExitLessonButton";
import { css } from "@emotion/css";
import { LessonCard } from "@/containers/lesson/LessonCard";
import { AnswerButton } from "@/containers/lesson/answer/AnswerButton";

export const LessonMain = () => {
  const initialized = useAtomValue(State.initialized);
  const lessonPageType = useAtomValue(State.lessonPageType);
  const count = useAtomValue(State.questionsCount);
  const questionId = useAtomValue(State.currentQuestionId);
  const submittedCount = useAtomValue(State.submittedCount);

  return (
    <>
      {/*<DebuggerContainer />*/}
      {/*<div style={{ position: 'fixed', top: 10, left: 10 }}>*/}
      {/*  <ButtonComponent onClick={resetState}>Reset</ButtonComponent>*/}
      {/*</div>*/}

      <ExitLessonButton />
      <ProgressBar progress={(submittedCount + 1) / (count + 1)} />
      <LessonSlider id={`${lessonPageType.type}_${questionId}`}>
        <LessonCard lessonPageType={lessonPageType} questionId={questionId} />
      </LessonSlider>

      <AnswerButton />
      <AnswerFeedback questionId={questionId} />
    </>
  );
};
