import React from 'react'
import Typography from '@mui/material/Typography'
import { css } from '@emotion/css'

export const ResultComponent = (props: { text: string; score: number }) => {
  const { text, score } = props

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
        align-items: center;
      `}
    >
      <Typography variant="h4">{text}:</Typography>
      <Typography variant="h2">{score}</Typography>
    </div>
  )
}
