import React from "react";
import { useTranslation } from "react-i18next";
import { ResultComponent } from "@/components/ResultComponent";
import { LessonPageType } from "@/db/types";

export const ResultCard = (props: { lessonPageType: LessonPageType }) => {
  const { lessonPageType } = props;
  const { t } = useTranslation();

  if (lessonPageType.type === "result") {
    return (
      <ResultComponent text={t("your_result")} score={lessonPageType.score} />
    );
  }

  return null;
};
