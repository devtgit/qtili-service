import React from 'react'
import { css } from '@emotion/css'
import { useTheme } from '@emotion/react'
import { use100vh } from 'react-div-100vh'

export const AppContainer = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme()
  const height = use100vh() || window.innerHeight

  return (
    <div
      className={css`
        //padding: 15px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        flex: 1;
        background: ${theme.palette.background.default};

        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        @media only screen and (min-width: 768px) {
          width: 430px;
          position: relative;
        }
      `}
    >
      {children}
    </div>
  )
}
