import React from "react";
import { useAtomValue } from "jotai";
import { getStorage, ref, getBlob, getDownloadURL } from "firebase/storage";
import { State } from "@/store/State";
import { Actions } from "@/store/Actions";
import { ChoiceItem, ChoicesList } from "@/components/ChoicesList";
import { storage } from "@/firebase/config";

const audio = new Audio();

export const AnswerChoices = (props: { questionId: string }) => {
  const { questionId } = props;
  const question = useAtomValue(State.questionAtomFamily(questionId));
  const answer = useAtomValue(State.answerAtomFamily(questionId));
  const setAnswer = Actions.useSetAnswer();

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
              setAnswer(questionId, choice.id);

              audio.pause();
              audio.currentTime = 0;

              console.log(choice);

              const blob = await getBlob(
                ref(storage, `snd/${choice.text}.mp3`)
              );
              console.log("blob", blob);
              const src = URL.createObjectURL(blob);
              console.log("src", src);

              // const src = `/sound/${choice.snd}.mp3`;
              if (audio.src !== src) {
                audio.src = src;
              }
              audio.play();

              // new Audio(`/sound/${choice.snd}.mp3`).play()
            }}
          />
        );
      })}
    </ChoicesList>
  );
};
