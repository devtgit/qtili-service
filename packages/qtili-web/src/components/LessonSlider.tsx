import React, { useState } from "react";
import { css } from "@emotion/css";
import { AnimatePresence, motion } from "framer-motion";

export const LessonSlider = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const [variants] = useState(() => ({
    initial: {
      x: "100%",
      opacity: 0.6,
    },
    animate: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: {
      zIndex: 0,
      x: "-50%",
      opacity: 0,
    },
  }));

  return (
    <div
      className={css`
        width: 100%;
        flex: 1;
        //margin: 10px;
        position: relative;
        overflow: hidden;
      `}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={id}
          variants={variants}
          {...variants}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className={css`
            position: absolute;
            width: 100%;
            padding: 15px;
            padding-bottom: 60px;
            height: 100%;
            display: flex;
            flex-direction: column;
          `}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
