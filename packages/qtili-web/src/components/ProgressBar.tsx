import React from "react";
import { motion } from "framer-motion";
import { css } from "@emotion/css";
import { useTheme } from "@mui/material";

export const ProgressBar = ({ progress }: { progress: number }) => {
  const theme = useTheme();

  return (
    <div
      className={css`
        padding-left: 54px;
        padding-top: 21px;
        padding-right: 15px;
      `}
    >
      <motion.div
        className={css`
          height: 7px;
          background: ${theme.palette.primary.main};
          transform-origin: 0;
        `}
        initial={false}
        animate={{ scaleX: progress }}
      />
    </div>
  );
};
