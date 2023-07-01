export type BaseQuestion = {
  id: string;
  correctChoiceText: string;
};

export type BaseAnswer = {
  id: string;
  isSubmitted: boolean;
  isCorrect: boolean;
};
