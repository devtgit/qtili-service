import React from 'react'
import { css } from '@emotion/css'
import { motion } from 'framer-motion'
import { useTheme } from '@emotion/react'

const FeedbackSlider = (props: {
  isQuestion: boolean
  isSubmitted: boolean
  isCorrect: boolean
  correctFeedbackTitle: string
  correctFeedbackText: string
  incorrectFeedbackTitle: string
  incorrectFeedbackText: string
}) => {
  const {
    isQuestion,
    isSubmitted,
    isCorrect,
    correctFeedbackTitle,
    correctFeedbackText,
    incorrectFeedbackTitle,
    incorrectFeedbackText,
  } = props

  const theme = useTheme()

  return (
    <motion.div
      className={css`
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        padding: 15px 15px 80px 15px;
        background: ${theme.palette.mode === 'dark'
          ? 'rgba(0, 0, 0, 0.2)'
          : 'rgba(180, 180, 180, 0.09)'};
        color: ${isCorrect
          ? theme.palette.success.main
          : theme.palette.error.main};
      `}
      initial={false}
      transition={{ type: 'tween', duration: 0.2 }}
      animate={{ y: isQuestion && isSubmitted ? '0%' : '110%' }}
    >
      {isQuestion && isSubmitted && (
        <div>
          <h3
            className={css`
              margin: 2px 0;
            `}
          >
            {isCorrect ? correctFeedbackTitle : incorrectFeedbackTitle}
          </h3>
          <div>{isCorrect ? correctFeedbackText : incorrectFeedbackText}</div>
        </div>
      )}
    </motion.div>
  )
}

export default FeedbackSlider
