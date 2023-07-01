import React from "react";
import { useAtomValue } from "jotai";
import { AnswerButtonComponent } from "@/components/AnswerButtonComponent";
import { State } from "@/store/State";
import { Actions } from "@/store/Actions";
import { useTranslation } from "react-i18next";
import { getIsAnswered } from "@/db/types";

export const AnswerButton = () => {
  const questionId = useAtomValue(State.currentQuestionId);
  const lessonPageType = useAtomValue(State.lessonPageType);
  const answer = useAtomValue(State.answerAtomFamily(questionId));
  const isAnswered = getIsAnswered(answer);
  const isSubmitted = useAtomValue(State.isSubmitted(questionId));

  const toNextQuestion = Actions.useToNextQuestion();
  const submitAnswer = Actions.useSubmitAnswer();

  const { t } = useTranslation();

  return (
    <AnswerButtonComponent
      onClick={() => {
        if (!isSubmitted) {
          submitAnswer(questionId);
          return;
        }

        toNextQuestion();
      }}
      disabled={!isSubmitted ? !isAnswered : false}
      isQuestion={lessonPageType.type === "question"}
      isAnswered={isAnswered}
      isSubmitted={isSubmitted}
      isCorrect={answer.isCorrect}
    >
      {!isSubmitted ? t("submit_answer") : t("next_question")}
    </AnswerButtonComponent>
  );
};
