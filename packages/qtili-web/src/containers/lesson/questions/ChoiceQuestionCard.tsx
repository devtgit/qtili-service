import React from "react";
import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";
import { ChoiceQuestion, ChoiceType } from "@/db/questions/ChoiceQuestion";
import { State } from "@/store/State";
import { Actions } from "@/store/Actions";
import { ChoiceItem, ChoicesList } from "@/components/ChoicesList";
import { getSound } from "@/api";

const audio = new Audio();

export const ChoiceQuestionCard = (props: { question: ChoiceQuestion }) => {
  const { question } = props;

  const { t } = useTranslation();

  return (
    <div>
      <h3>
        {t("translate", {
          word: question.word,
        })}
      </h3>
      <AnswerChoices question={question} />
    </div>
  );
};

const AnswerChoices = (props: { question: ChoiceQuestion }) => {
  const { question } = props;
  const questionId = question.id;
  const answer = useAtomValue(State.answerAtomFamily(questionId));
  const setAnswer = Actions.useSetAnswer();

  if (answer.type === ChoiceType) {
    return (
      <ChoicesList>
        {question.choices.map((choice) => {
          return (
            <ChoiceItem
              key={choice.id}
              text={choice.text}
              pic={undefined} // temporary
              isSelected={answer.selectedId === choice.id}
              isSubmitted={answer.isSubmitted}
              onClick={async () => {
                setAnswer(questionId, {
                  questionType: ChoiceType,
                  type: "SET_ANSWER",
                  choiceId: choice.id,
                });

                audio.pause();

                const src = await getSound(choice.text);

                audio.src = src;
                audio.currentTime = 0.16;
                audio.play();
              }}
            />
          );
        })}
      </ChoicesList>
    );
  }

  return null;
};
