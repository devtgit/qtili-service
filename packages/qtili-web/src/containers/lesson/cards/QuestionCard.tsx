import React from "react";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";
import { State } from "@/store/State";
import { AnswerChoices } from "@/containers/lesson/cards/AnswerChoices";
import { ChoiceType } from "@/db/questions/ChoiceQuestion";

const QuestionCardComponent = (props: { questionId: string }) => {
  const { questionId } = props;
  const question = useAtomValue(State.questionAtomFamily(questionId));
  const { t } = useTranslation();

  if (!question) {
    // handle reset case
    return null;
  }

  if (question.type === ChoiceType) {
    return (
      <div>
        <h3>
          {t("translate", {
            word: question.word,
          })}
        </h3>
        <AnswerChoices questionId={questionId} />
      </div>
    );
  }

  return null;
};
QuestionCardComponent.displayName = "QuestionCard";

export const QuestionCard = React.memo(QuestionCardComponent);
