import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/css'
import { useTheme } from '@emotion/react'

export const ChoicesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
`

export const ChoiceItem = ({
  text,
  pic,
  isSelected,
  isSubmitted,
  ...rest
}: {
  text: string
  isSelected: boolean
  isSubmitted: boolean
  pic: string | undefined
} & JSX.IntrinsicElements['button']) => {
  const theme = useTheme()

  return (
    <button
      className={css`
        padding: 10px;
        border-radius: 6px;
        border: 2px solid
          ${isSelected ? theme.palette.info.main : theme.border.main};
        cursor: pointer;
        display: flex;
        flex-direction: column;
        background-color: ${theme.palette.background.default};
        color: ${theme.palette.text.primary};
        -webkit-tap-highlight-color: transparent;

        &:disabled {
          cursor: default;
        }
      `}
      disabled={isSubmitted}
      {...rest}
    >
      {pic && (
        <img
          src={`/pictures/${pic}.svg`}
          alt={text}
          className={css`
            width: 100%;
            height: calc(100% - 30px);
          `}
        />
      )}
      <div
        className={css`
          font-size: 18px;
        `}
      >
        {text}
      </div>
    </button>
  )
}
