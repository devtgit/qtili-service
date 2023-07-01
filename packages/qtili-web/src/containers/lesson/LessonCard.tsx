import React from "react";
import { ResultCard } from "@/containers/lesson/cards/ResultCard";
import { QuestionCard } from "@/containers/lesson/cards/QuestionCard";
import { LessonPageType } from "@/db/types";

export const LessonCard = (props: {
  lessonPageType: LessonPageType;
  questionId: string;
}) => {
  const { lessonPageType, questionId } = props;

  if (lessonPageType.type === "result") {
    return <ResultCard lessonPageType={lessonPageType} />;
  }

  return <QuestionCard questionId={questionId} />;
};
