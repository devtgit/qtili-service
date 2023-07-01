import React from "react";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";
import FeedbackSlider from "@/components/FeedbackSlider";
import { State } from "@/store/State";

export const AnswerFeedback = (props: { questionId: string }) => {
  const { questionId } = props;
  const lessonPageType = useAtomValue(State.lessonPageType);
  const isSubmitted = useAtomValue(State.isSubmitted(questionId));
  const answer = useAtomValue(State.answerAtomFamily(questionId));
  const question = useAtomValue(State.questionAtomFamily(questionId));
  const { correctChoiceText } = question;

  const { t } = useTranslation();

  return (
    <FeedbackSlider
      isQuestion={lessonPageType.type === "question"}
      isSubmitted={isSubmitted}
      isCorrect={answer.isCorrect}
      correctFeedbackTitle={t("correct_feedback_title")}
      correctFeedbackText={""}
      incorrectFeedbackTitle={t("incorrect_feedback_title")}
      incorrectFeedbackText={t("incorrect_feedback", {
        answer: correctChoiceText,
      })}
    />
  );
};
