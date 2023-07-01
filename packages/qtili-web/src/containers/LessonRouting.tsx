import React from "react";
import { ResultCard } from "@/containers/ResultCard";
import { QuestionCard } from "@/containers/QuestionCard";
import { LessonPageType } from "@/db/types";

export const LessonRouting = (props: {
  lessonPageType: LessonPageType;
  questionId: string;
}) => {
  const { lessonPageType, questionId } = props;

  if (lessonPageType.type === "result") {
    return <ResultCard lessonPageType={lessonPageType} />;
  }

  return <QuestionCard questionId={questionId} />;
};
