import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { AppTheme } from "@/theme/theme";

type Props = {
  isQuestion: boolean;
  isAnswered: boolean;
  isSubmitted: boolean;
  isCorrect: boolean;
} & Parameters<typeof motion.button>[0];

export const AnswerButtonMotion = (props: Props) => {
  const { disabled } = props;

  return (
    <motion.button
      {...props}
      whileTap={{
        scale: disabled ? 1 : 0.93,
      }}
    />
  );
};

export const AnswerButtonComponent = styled(AnswerButtonMotion)`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  //background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
  width: calc(100% - 30px);
  user-select: none;
  background-color: ${(props) => backgroundColor(props)};
  color: #fff;
  -webkit-tap-highlight-color: transparent;
  transition: 200ms background-color;

  position: absolute;
  bottom: 15px;
  left: 15px;
  right: 0;
  z-index: 1;

  &:hover {
    //border-color: #646cff;
  }

  &:focus,
  &:focus-visible {
    //outline: 4px auto -webkit-focus-ring-color;
  }

  &:disabled {
    border-color: transparent;
    background-color: rgba(130, 130, 130, 0.2);
    color: ${(props) => props.theme.palette.text.disabled};
    cursor: default;
  }
`;

function backgroundColor(props: Props & { theme: AppTheme }) {
  if (!props.isQuestion) {
    return props.theme.palette.info.main;
  }

  if (!props.isSubmitted) {
    if (props.isAnswered) {
      return props.theme.palette.success.main;
    } else {
      return "rgba(0,0,0,0.2)";
    }
  } else {
    if (props.isCorrect) {
      return props.theme.palette.success.main;
    } else {
      return props.theme.palette.error.main;
    }
  }
}
