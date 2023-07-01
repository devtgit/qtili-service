import React from "react";
import { useAtomValue } from "jotai";
import { State } from "@/store/State";
import { ChoiceType } from "@/db/questions/ChoiceQuestion";
import { ComposeType } from "@/db/questions/ComposeQuestion";
import { ChoiceQuestionCard } from "@/containers/lesson/questions/ChoiceQuestionCard";
import { ComposeQuestionCard } from "@/containers/lesson/questions/ComposeQuestionCard";

const QuestionCardComponent = (props: { questionId: string }) => {
  const { questionId } = props;
  const question = useAtomValue(State.questionAtomFamily(questionId));

  if (!question) {
    // handle reset case
    return null;
  }

  if (question.type === ChoiceType) {
    return <ChoiceQuestionCard question={question} />;
  }

  if (question.type === ComposeType) {
    return <ComposeQuestionCard question={question} />;
  }

  return null;
};
QuestionCardComponent.displayName = "QuestionCard";

export const QuestionCard = React.memo(QuestionCardComponent);
