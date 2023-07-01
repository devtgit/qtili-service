import React from "react";
import { useAtomValue } from "jotai";
import { State } from "@/store/State";
import { Actions } from "@/store/Actions";
import { ChoiceItem, ChoicesList } from "@/components/ChoicesList";
import { getSound } from "@/api";
import { ChoiceType } from "@/db/questions/ChoiceQuestion";

const audio = new Audio();

export const AnswerChoices = (props: { questionId: string }) => {
  const { questionId } = props;
  const question = useAtomValue(State.questionAtomFamily(questionId));
  const answer = useAtomValue(State.answerAtomFamily(questionId));
  const setAnswer = Actions.useSetAnswer();

  if (question.type === ChoiceType && answer.type === ChoiceType) {
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
                setAnswer(questionId, { choiceId: choice.id });

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